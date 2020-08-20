const express = require("express");

const router = express.Router();
const { Reservation } = require("../models/Reservation");
const { Payment } = require("../models/Payment");

//영화예매 가격 불러오기
router.get("/getReservationSales", (req, res) => {
    Reservation.find({}, ["price"]).exec((err, result) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, result });
    });


});


//매점판매 가격 불러오기
router.get("/getProductSales", (req, res) => {
    Payment.find({}, ["product"]).exec((err, doc) => {
        let arr = [];
        doc.map(({ product }) => {
            arr.push(product[0].price)
        })
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, arr });
    })
});


module.exports = router;