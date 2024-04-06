const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require('node-cron');
const cors = require('cors');
const authRoute = require("./routes/auth");
const weatherRoute = require("./routes/weather");
const dataGenerator = require('./data-generators/generator');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection successfull!"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/weather", weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}!`);
});

// cron.schedule("* * * * * *", function() {
//     dataGenerator.saveRandomValuesToDatabase();
// });

