const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    class_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        }
    ]
});

module.exports = mongoose.model("Teacher", TeacherSchema);