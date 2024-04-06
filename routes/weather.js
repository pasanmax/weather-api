const router = require("express").Router();
const Weather = require("../models/Weather");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./verifyToken");


/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       required:
 *         - district
 *         - cordinates
 *       properties:
 *         district:
 *           type: string
 *           description: District name
 *         cordinates:
 *           type: array
 *           description: District coordinates
 *         temperature:
 *           type: number
 *           description: Temperature in celsius
 *         humidity:
 *           type: number
 *           description: Humidity as a percentage
 *         airPressure:
 *           type: number
 *           description: Air pressure in hectopascals
 *       example:
 *         district: Gampaha
 *         cordinates: [80.00783459249442,9.669316542945182]
 *         temperature: 25.35
 *         humidity: 90.6
 *         airPressure: 975.86
 */

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: The weather routes
 * /weather:
 *   post:
 *     summary: Create a new district with default weather values.
 *     tags: [Weather]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weather'
 *     responses:
 *       200:
 *         description: Added a new district.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       404:
 *         description: Content Not Found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * /weather/districts:
 *   get:
 *     summary: Get all districts ids with name.
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Returned results.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       404:
 *         description: Content Not Found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * /weather/districts/{id}:
 *   put:
 *     summary: Updates new weather values to the specific district.
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: District id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weather'
 *     responses:
 *       200:
 *         description: Returned results.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       404:
 *         description: Content Not Found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * /weather/districts/data:
 *   get:
 *     summary: Get all districts weather details.
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Returned results.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       404:
 *         description: Content Not Found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

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

router.get("/districts", verifyToken, async (req, res) => {
    try {
        const districts = await Weather.find({},{
            district: 1
        });
        res.status(200).json(districts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/districts/data", verifyToken , async (req, res) => {
    try {
        const weatherData = await Weather.find();
        res.status(200).json(weatherData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/districts/:id", verifyToken, async (req, res) => {
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