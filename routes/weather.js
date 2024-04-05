const router = require("express").Router();
const Weather = require("../models/Weather");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


router.post("/", async (req,res) => {
    const newWeather = new Weather(req.body);

    try {
        const savedWeather = await newWeather.save();
        res.status(201).json(savedWeather);
    } catch (err) {
        //console.log(err);
        res.status(500).json(err);
    }

});

router.get("/districts", async (req, res) => {
    try {
        const districts = await Weather.find({},{
            district: 1
        });
        res.status(200).json(districts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/districts/:id", async (req, res) => {
    try {
        const updatedWeather = await Weather.findByIdAndUpdate(req.params.id, {
            $set: {
                temperature: req.body.randomTemperature,
                humidity: req.body.randomHumidity,
                airPressure: req.body.randomAirPressure
            }
        }, { new: true });
        const { __v, ...others } = updatedWeather._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;