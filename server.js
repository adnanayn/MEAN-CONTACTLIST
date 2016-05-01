var express = require('express');
var mongojs = require('mongojs');
var bodyParser= require('body-parser');
var db = mongojs('contactlist',['contactlist']);
var app = express();
const PORT = 3000
app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function (req,res) {
   console.log("GET REQUEST");
    db.contactlist.find(function (err,docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req,res) {
    console.log(req.body);
    
    db.contactlist.insert(req.body, function (err,doc) {
        res.json(doc);
    })
});

app.delete('/contactlist/:id',function (req,res) {
   var id = req.params.id;
    db.contactlist.remove({_id: mongojs.ObjectId(id)},function (err,doc) {
        res.json(doc);
    });
    console.log(id);
});
app.get('/contactlist/:id',function (req,res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)},function (err,doc) {
        res.json(doc);
    });
});
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );
});

app.listen(PORT);
console.log("Server is Running at: "+ PORT);