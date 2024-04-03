const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    country: { type: String, required: true, unique: true },
    district: { type: String, required: true, unique: true },
    temperature: { type: Number },
    humidity: { type: Number },
    airPressure: { type: Number },
}, {timestamps: true});

module.exports = mongoose.model("Weather", WeatherSchema);