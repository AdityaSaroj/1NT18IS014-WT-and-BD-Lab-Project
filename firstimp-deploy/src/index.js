// main server file

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const logger = require("./middleware/logger");
const product = require("./routes/product");

const notFound = require("./routes/notFound");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// const DBName = `firstImpTest`;
// mongoose.connect(`mongodb://localhost:27017/${DBName}`, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.use(logger);

app.use("/api", product);

//app.use("*", notFound);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
    });
}

app.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);
