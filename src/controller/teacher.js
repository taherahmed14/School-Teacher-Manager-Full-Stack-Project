const express = require("express");
const router = express.Router();
const Teacher = require("../model/teacher_model");

router.post("", async(req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        return res.status(201).send(teacher);
    }
    catch(e) {
        return res.status(400).send({ message: e.message, status: "Failed" });
    }
});

router.get("", async(req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        const skip = ((page-1)*size);

        const gender_query = req.query.gender || "none";
        const sort_age = req.query.sort || "none";

        let teachers;
        if(gender_query === "none" && sort_age === "none") {
            teachers = await Teacher.find().populate("class_id").skip(skip).limit(size).lean().exec();
        }
        else if(gender_query === "none" && sort_age === "ascending") {
            teachers = await Teacher.find().populate("class_id").skip(skip).limit(size).lean().exec();
            teachers.sort((a,b) => a.age - b.age);
        }
        else if(gender_query === "none" && sort_age === "descending") {
            teachers = await Teacher.find().populate("class_id").skip(skip).limit(size).lean().exec();
            teachers.sort((a,b) => b.age - a.age);
        }
        else if(gender_query !== "none" && sort_age === "none") {
            teachers = await Teacher.find({ gender: gender_query }).populate("class_id").skip(skip).limit(size).lean().exec();
        }
        else if(gender_query !== "none" && sort_age === "ascending") {
            teachers = await Teacher.find({ gender: gender_query }).populate("class_id").skip(skip).limit(size).lean().exec();
            teachers.sort((a,b) => a.age - b.age);
        }
        else if(gender_query !== "none" && sort_age === "descending") {
            teachers = await Teacher.find({ gender: gender_query }).populate("class_id").skip(skip).limit(size).lean().exec();
            teachers.sort((a,b) => b.age - a.age);
        }
        return res.status(201).send(teachers);
    }
    catch(e) {
        return res.status(400).send({ message: e.message, status: "Failed" });
    }
});

router.get("/:id", async(req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate("class_id").lean().exec();
        return res.status(201).send(teacher);
    }
    catch(e) {
        return res.status(400).send({ message: e.message, status: "Failed" });
    }
});

module.exports = router;