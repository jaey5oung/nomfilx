const express = require("express");
const router = express.Router();
const { Reservation } = require("../models/Reservation");
const { auth } = require("../middleware/auth");
router.post("/", (req, res) => {
  const reservation = new Reservation(req.body);

  reservation.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/findSeat", (req, res) => {
  Reservation.find({ title: req.body.title }).exec((err, seats) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, seats });
  });
});

//해다영화ID값의 _id필드값 (select _id from reservation where id:req.bod.id)
router.post("/getMovieId", (req, res) => {
  Reservation.find({ id: req.body.id }, ["_id"]).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getList", (req, res) => {
  Reservation.find().exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.get("/reservation_by_id", auth, (req, res) => {
  let type = req.query.type;
  let movieIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");

    movieIds = ids.map(item => {
      return item;
    });
  }
  
  Reservation.find({ _id: { $in: movieIds } })
    .populate("userForm")
    .exec((err, movie) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(movie);
    });
});

module.exports = router;
