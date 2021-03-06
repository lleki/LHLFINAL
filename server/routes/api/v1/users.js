var express = require("express");
var router = express.Router();
const knexConfig = require("../../../knexfile.js");
const environment = process.env.NODE_ENV || 'development';
const knex = require("knex")(knexConfig[environment]);
const bcrypt = require('bcryptjs');
const jsonWebToken = require("jsonwebtoken");
const myJWTSecretKey = 'my-secret-key';


router.get("/", function(req, res, next) {
  knex
    .select("*")
    .from("users")
    .then(rows => {
      res.json(rows);
    })
    .catch(error => {
      console.error("error: ", error);
    });
});


router.post("/login", function(req, res, next) {
  knex
    .select("*")
    .from("users")
    .where({email: req.body.email}).first()
    .then(row => {
      console.log(row);
      bcrypt.compare(req.body.password, row.password, function(err, response) {
          if(response){
            const token = jsonWebToken.sign(row, myJWTSecretKey);
            res.json({
              token: token
            });
            console.log("back end", token);
          }else{
            res.status(404).json({
                   error: true,
                   message: 'Username or Password is Wrong'
             });
          }
      })
    })
    .catch(error => {
      res.status(404).json({
                   error: true,
                   message: 'User does not exist'
             });
    });
});


router.post("/register", function(req, res, next) {
  const user = {
    email: req.body.email
  };

  bcrypt.hash(req.body.password, 10, function(err, hash) {

    user.password = hash;
    console.log("user in server", user);
    knex('users').insert(user)
    .then(() => {
      const token = jsonWebToken.sign(user, myJWTSecretKey);
      res.json({
        token: token
      });
    })


  });
  // extract user info from the form -> create the user object
  // save it to database (bcrypt for password)

});

module.exports = router;
