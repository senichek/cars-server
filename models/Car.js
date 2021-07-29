const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    productionDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Cars", CarSchema);