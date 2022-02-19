const express = require("express");
const router = express.Router();
const Class = require("../model/class_model");

router.post("", async(req, res) => {
    try {
        const classes = await Class.create(req.body); 
        return res.status(201).send(classes);
    }
    catch(e) {
        return res.status(400).send({ message: e.message, status: "Failed" });
    }
});

router.get("", async(req, res) => {
    try {
        const classes = await Class.find().lean().exec();
        return res.status(201).send(classes);
    }
    catch(e) {
        return res.status(400).send({ message: e.message, status: "Failed" });
    }
});

module.exports = router;