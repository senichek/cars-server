const express = require("express");
var cors = require('cors')
const mongoose = require("mongoose");

const app = express();

require("dotenv/config");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors())

// Connect to DB, see .env file;
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    });

// DB Connection status - 0: disconnected; 1: connected; 2: connecting; 3: disconnecting;
console.log("DB connection status: " + mongoose.connection.readyState);


// Import routes;
const carsRoute = require("./routes/cars");
const usersRoute = require("./routes/users")

// Every time you go to /cars the carsRoute will be used;
app.use("/cars", carsRoute);
app.use("/users", usersRoute);

app.listen(3000);