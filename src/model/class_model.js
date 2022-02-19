const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    grade: {type: String},
    section: {type: String},
    subject: {type: String}
});

module.exports = mongoose.model("Class", ClassSchema);