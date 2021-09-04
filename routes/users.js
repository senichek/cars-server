const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get("/:userID", async (req, res) => {
    try {
        const user = await User.findById(req.params.userID);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post("/", async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        // Every new registered user will have the default role of User
        roles: ['user'],
        favCars: req.body.favCars
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err })
    }
});

router.delete("/:userID", async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.userID });
        res.json(removedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch("/:userID", async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userID },  // _id - this is how ID looks in DB;
            {
                $set:
                {
                    email: req.body.email,
                    password: req.body.password,
                    favCars: req.body.favCars
                }
            }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;