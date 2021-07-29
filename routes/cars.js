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

router.get("/:carID", async (req, res) => {
    try {
        const car = await Car.findById(req.params.carID);
        res.json(car);
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

router.delete("/:carID", async (req, res) => {
    try {
        const removedCar = await Car.deleteOne({ _id: req.params.carID });
        res.json(removedCar);
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch("/:carID", async (req, res) => {
    try {
        const updatedCar = await Car.updateOne(
            { _id: req.params.carID },  // _id - this is how ID looks in DB;
            {
                $set:
                {
                    model: req.body.model,
                    description: req.body.description,
                    color: req.body.color,
                    productionDate: req.body.productionDate,
                    image: req.body.image
                }
            }
        );
        res.json(updatedCar);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;