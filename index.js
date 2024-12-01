const express = require('express');
const urlroute = require("./Route/Url");

const { ConnectwithDb } = require("./Connect");


const app = express();
const port = 8001;

// Middleware to parse JSON bodies
app.use(express.json());


ConnectwithDb(process.env.MongoUrl).then(()=>console.log("Db connected"))


// Register the URL route
app.use('/url', urlroute);

app.listen(port, () => console.log(`Server started on port`, port));