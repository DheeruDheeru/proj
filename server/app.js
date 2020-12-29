const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

var port = 8080;
// var host = '192.168.1.103'; 
var host = 'localhost';
var router = require('./routes');

const bp = require('body-parser');
app.use(bp.json(),bp.urlencoded({extended:true}));

const mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/usersDB";

mongoose.connect(uri,{useUnifiedTopology:true,useNewUrlParser:true});
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

db.once('open',()=>{
    console.log("Connected");
});

app.use('/api',router);

app.listen(port,host, () => {
    console.log(`server is running on http://${host}:${port}`);
})