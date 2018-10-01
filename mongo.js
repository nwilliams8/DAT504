const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db){
  if (err) throw err;
  var dbo = db.db('mydb');
  var myQuery = { Company: "University of Plymouth"};
  dbo.collection("customers").deleteOne(myQuery, function(err, res){
      if (err) throw err;
      console.log("1 Document Deleted");
      db.close();
  })
});

//Create entry/Document
//MongoClient.connect(url, function(err, db){
//  if (err) throw err;
  //var dbo = db.db('mydb');
//  var myData = { name: "Neil", Company: "University of Plymouth"};
//  dbo.collection("customers").insertOne(myData, function(err, res){
      //if (err) throw err;
    //  console.log("1 Document Inserted");
  //    db.close();
//  })
//});
// Database connection
//MongoClient.connect(url, function(err, db){
//  if (err) throw err;
//  console.log("Database connection");
//  db.close();
//});
