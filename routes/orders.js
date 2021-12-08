const express = require("express");
const router = express.Router();

const {
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    addOrder,
} = require("../controllers/ordersController");

router.route("/").get(getOrders).post(addOrder);

router.route("/:oid").get(getOrder).delete(deleteOrder).put(updateOrder);

module.exports = router;
