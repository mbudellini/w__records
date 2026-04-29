const router = require("express").Router();
const controller = require("../controllers/payment_controller.js");

router.post("/create-checkout-session", controller.create_checkout_session);
router.post("/checkout-session", controller.checkout_session);
router.get("/all-orders", controller.get_all_orders);

module.exports = router;