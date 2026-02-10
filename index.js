const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./config/dbConfig");
const authRoute = require("./routes/userRoute")
// const User = require("./models/userModel")


const PORT = process.env.PORT || 3000;
connectDB();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());




app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


app.use("/api/v1/auth", authRoute)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});



