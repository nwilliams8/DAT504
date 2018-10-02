const express = require("express");
const mongoose = require("mongoose")
const PORT = 3000;
const bodyParser = require("body-parser")
const mongodb = require('mongodb')


const MONGO_URL = 'mongodb://localhost:27017/addressbook';
const app = express();


mongoose.connect(MONGO_URL, { useNewUrlParser: true});
const db = mongoose.connection

db.on('error',(error) => console.log("mongodb error", error));

const personSchema = mongoose.Schema({
  name: String,
  phoneNumber : String,
  place : String,
  email : String,
  age : Number,
  hobbies : [String],
})

const Person = mongoose.model('Person', personSchema);

app.use(bodyParser.json());

app.get('/', function (request, response){
  return response.json({
    'status': 'Sucess',
    'message': 'Hello'
  });
});

app.post('/addressbook/', (request, response) => {
  console.log('body', request.body)
  const newPerson = new Person(request.body)
  newPerson.save(function(error){
    if (error) throw error;
    return response.send(`Saved ${request.body.name} to address book`)
  });
  return
});
app.get('/addressbook/', (request, response) => {
  console.log("query parameters", request.query);
  Person.find(function(error, people){
    if (error) throw error
    return response.json(people);
  });
});

app.put('/addressbook/person', (request, response) =>{
  console.log("UserId", request.params.personID);
  Person.find({ _id: request.params.personID}, function(error, person){
    person.age = request.body.age
    person.place = request.body.place
    person.name = request.body.name
    person.email = request.body.email
    person.phoneNumber = request.body.phoneNumber
    person.hobbies = request.body.hobbies
    person.save();
    return response.send("sadadssfgrgw ger")
  })
  return response.send("this will update in a bit")
})


app.listen(PORT, function(){
  console.log(`Server listening at ${PORT}`)
})
