const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ text: "Hello There" });
});

router.post("/", (req, res) => {
    res.send({ text: "404 not found" });
});

module.exports = router;
