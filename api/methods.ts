import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as User from '../models/users';
import * as jwt from 'jsonwebtoken';


function isAuthenticated (req, res, next) {
  let findToken = req.headers['cookie'].split(' ').filter((v, k) => {
   return v.split('=')[0] === 'token';
  });

  let token = findToken.length >= 1 ? findToken[0].split('=')[1].split(';')[0] : '';

  return jwt.verify(token, 'SecretKey', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).send({ message: 'Unauthorized'});
    return next();
  });
}

export = {
  isAuthenticated: isAuthenticated
};
