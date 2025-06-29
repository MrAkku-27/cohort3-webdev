const express = require("express");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const connectDB = require("./config/db");
require('dotenv').config();
const app =express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);

connectDB();
app.listen(3000);



