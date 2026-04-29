const axios = require("axios");
const { DiscogsCollection: Record } = require("../models/models");

const BASE_URL =
  "https://api.discogs.com/users/disqueria_what/collection/folders/0/releases?token=KLFeKFjuERpdHJsrNQGCoSUUTbPGfcTskJfkuHIP";
const HEADERS = { headers: { "User-Agent": "w__records/1.0" } };

const getCollection = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, HEADERS);
    res.send({ ok: true, message: response.data });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
};

const saveCollection = async (req, res) => {
  try {
    let page = 1;
    let totalPages = 1;
    let saved = 0;
    const discogsInstancesIds = [];
    do {
      const response = await axios.get(`${BASE_URL}&page=${page}`, HEADERS);
      const { pagination, releases } = response.data;
      totalPages = pagination.pages;

      for (const release of releases) {
        await Record.findOneAndUpdate(
          { instance_id: release.instance_id },
          release,
          {
            upsert: true,
            returnDocument: "after",
          },
        );
        discogsInstancesIds.push(release.instance_id);
        saved++;
      }

      page++;
    } while (page <= totalPages);
    const { deletedCount } = await Record.deleteMany({
      instance_id: { $nin: discogsInstanceIds },
    });

    res.send({
      ok: true,
      message: `${saved} records saved, ${deletedCount} records removed from the database.`,
    });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
};

const getCollectionFromDB = async (req, res) => {
  try {
    const records = await Record.find();
    res.send({
      ok: true,
      message: `Retrieved ${records.length} records from database.`,
      data: records,
    });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
};

module.exports = {
  getCollectionFromDB,
  getCollection,
  saveCollection,
};
