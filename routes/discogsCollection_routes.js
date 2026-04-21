const router = require("express").Router();
const controller = require("../controllers/discogsCollection_controller.js");


router.get("/saveCollection",controller.saveCollection)
router.get("/getCollection", controller.getCollection);
router.get("/getCollectionFromDB", controller.getCollectionFromDB);
module.exports = router;
