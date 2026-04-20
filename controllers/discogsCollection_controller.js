//uncomment if you need to use the database
//const Test = require('../models/models.test')

const axios = require("axios");

const getCollection = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.discogs.com/database/search?q=Nirvana&token=KLFeKFjuERpdHJsrNQGCoSUUTbPGfcTskJfkuHIP"
    );
    console.log(response.data)
    res.send({ ok: true, message:response.data });

  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
};

module.exports = {
  getCollection,
};
