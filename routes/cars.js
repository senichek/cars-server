const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post("/", async (req, res) => {
    const car = new Car({
        model: req.body.model,
        description: req.body.description,
        color: req.body.color,
        productionDate: req.body.productionDate,
        image: req.body.image
    });
    try {
        const savedCar = await car.save();
        res.json(savedCar);
    } catch (err) {
        res.json({ message: err })
    }
});

module.exports = router;