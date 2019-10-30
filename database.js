//requirements
//filesystem
var fs = require('fs');
//mongo DB
var MongoClient = require('mongodb').MongoClient;
//database location and port
var url = "mongodb://localhost:27017/";

//load dummydata from filesystem
var data = fs.readFileSync('dummyData.json', 'utf8');

//convert data to object
var combatAnimals = JSON.parse(data);

//create connection to db
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("army_staff_db");
    dbo.createCollection("combat_animals", function (err, res) {
        if (err) throw err;
        dbo.collection("combat_animals").insertMany(combatAnimals, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
          });
    });
});