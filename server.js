const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Timeout after 5 seconds instead of 30 seconds
})
    .then(() => console.log("Mongodb Connection Success!"))
    .catch((err) => console.error("Mongodb Connection Failed: ", err));

const newsRoutes = require("./routes/newsRoutes.js");
app.use("/news", newsRoutes);

const userRouter = require("./routes/users.js");
app.use("/users", userRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
});
