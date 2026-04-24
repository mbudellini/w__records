const router = require("express").Router();
const controller = require("../controllers/cart_controller.js");

// Aggiungi un item al carrello
router.post("/addToCart", controller.addToCart);

// Visualizza il carrello dell'utente
router.get("/viewUserCart", controller.getUserCart);

// Rimuovi un item dal carrello
router.delete("/deleteOne", controller.removeFromCart);

module.exports = router;
