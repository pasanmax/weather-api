const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection successfull!"))
.catch((err) => {
    console.log(err);
});


app.use(express.json());

app.use("/weather/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}!`);
});