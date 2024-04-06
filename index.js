const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require('node-cron');
const cors = require('cors');
const authRoute = require("./routes/auth");
const weatherRoute = require("./routes/weather");
const dataGenerator = require('./data-generators/generator');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection successfull!"))
.catch((err) => {
    console.log(err);
});

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Weather API",
        version: "1.0.0",
        description:
          "Weather API that demonstrate real-time weather information in Sri Lanka",
        contact: {
          name: "Pasan Anjana Hettiarachchi",
          url: "https://github.com/pasanmax",
          email: "pasan.anjana98@outlook.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000/api",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/weather", weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}!`);
});

cron.schedule("* * * * * *", function() {
    dataGenerator.saveRandomValuesToDatabase();
});

