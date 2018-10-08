var express = require('express');
var session = require('express-session')
var mongoose = require('mongoose');
var app = express();
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var User = mongoose.model('User', UserSchema);
module.exports= User;

mongoose.connect('mongodb://localhost/LoginData');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //connection established
});

app.use(session({
  resave: true,
  saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


router.get('/', function (req, res, next){
  return res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/', function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err)
  }
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else if (req.body.logemail && req.body.logpassword) {
      User.authenticate(req.body.logemail, req.body.logpassword, function(error, user){
        if (error || !user) {
          var err = new Error('Wrong email or password');
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user == null) {
        var err = new Error('User does not exist');
        err.status = 400;
        return next(err);
      } else {
        return res.send('<h1> Name: </h1>' + user.username + '<h2> Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
      }
    }
  });
});

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
})




var UserSchema = new mongoose.Schema ({
  email: {
    type: String,
    unique: true,
    required: true
    trim: true
  }
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true,
  }
});
UserSchema.pre('save', function (next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
      return next (err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function(email, password, callback){
  User.findOne({email: email})
  .exec(function (err, user) {
    if (err) {
      return callback (err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback (err);
    }
    bcrypt.compare(password, user.password, function (err, result)
  {
    if (result === true) {
      return callback(null, user);
    } else {
      return callback();
    }
  })
  });
}

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
