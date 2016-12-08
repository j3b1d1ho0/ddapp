import express = require('express');
import mongoose = require('mongoose')
import passport = require('passport');
import * as jwt from 'jsonwebtoken';
import * as acl from 'acl';
import methods from './methods';
import User from '../models/users';
import * as session from 'express-session';
import permission from '../config/permission';

let router = express.Router();

router.get("/users/me", methods.isAuthenticated, (req, res, next) => {
  User.findOne(req.user._id).select('-passwordHash -salt').then((user) => {
    return res.status(200).send({user: user});
  }).catch((err) => {
    return res.status(404).send({err: 'User not found.'})
  });
}); 

router.get('/users/:id', (req, res, next) => {
  User.findOne(req.params._id).select('-passwordHash -salt').then((user) => {
    return res.status(200).send({user: user});
  }).catch((err) => {
    return res.status(404).send({err: 'User not found.'})
  });
});

router.get('/currentuser', methods.isAuthenticated, function(req, res, next) {
  User.findOne({_id: req.user._id}).select('-passwordHash -salt').then((user) => {
    return res.send({"user": user});
  }).catch((err) =>{
    return res.status(100).send({"message": `Unauthorized`, err: err})
  });
});

router.post('/Register', (req, res, next) => {
  let user = new User();
  console.log(req.body, "cheers")
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  if (req.body.key === process.env.ADMIN_KEY) {
    user.userType = "admin"
  } 

  user.save(function(err, user) {
      console.log(err)
    if(err) return next(err);
    res.send("Registration Complete. Please login.");
  });
});
router.post('/Login/Local', function(req, res, next) {
  if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
  passport.authenticate('local', function(err, user, info) {
    console.log('--= Passport Auth =--');
    if(err) return next(err);
    if(user) {
      //TODO = I'm not being assigned a cookie for res.cookie...
      let token = user.generateJWT();
      req.session.regenerate((err) => {
        console.log(err)
      });
      req.session.save((err) => {
        console.log('session saved'),
        err
      })
      return res.json({ token: token, _id: user._id});
    }
      return res.status(400).send(info);
  })(req, res, next);
});

router.get('Logout/local', ((req, res, next) => {
  req.logout;

  req.session.destroy((err) => {
    if (err) return res.status(500).send({message: 'still authenticated, please try again.'});
    req.user = null;
    return res.redirect('/')
  });
})); 


router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/account' }),
  function(req, res) {
    if(req.isAuthenticated()) {
    let token = { token : req.user.generateJWT() };
    console.log(token.token);
    res.redirect('/#/Token/' + token.token);
    } else {
    	res.send("You are not authenticated.")
    }
  }); // end of facebook cb

export = router;
