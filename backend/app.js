const express = require('express');
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/user-routes')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    next();
  });


app.use("/api", userRoutes);

mongoose.connect("mongodb+srv://mahendra:zI4d6oKYQip1f062@cluster0.wlu0ovk.mongodb.net/users?retryWrites=true&w=majority").then(() => {
    app.listen(4000,() => {
        console.log("your app is listing on port 4000")
    })
}).catch((err) => console.log(err));

