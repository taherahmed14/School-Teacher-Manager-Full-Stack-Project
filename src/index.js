const express = require("express");
const app = express();
const connect = require("./config/db");

app.use(express.json());

const teacherCont = require("./controller/teacher");
const classCont = require("./controller/classes");

app.use("/teacher", teacherCont);
app.use("/classes", classCont);

app.listen(2345, async function() {
    await connect();
    console.log("Listening in port 2345");
});