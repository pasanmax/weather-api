const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    district: { type: String, required: true, unique: true },
    cordinates: { type: Array, required: true },
    temperature: { type: Number, default: 0 },
    humidity: { type: Number, default: 0 },
    airPressure: { type: Number, default: 0 },
}, {timestamps: true});

module.exports = mongoose.model("Weather", WeatherSchema);