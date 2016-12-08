import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

//TODO return get currentUser from model

export interface IUser extends mongoose.Document {
  username: { type: String, lowercase: true, unique: true},
  email: { type: String, unique: true, lowercase: true },
  userType: String,
  passwordHash: String,
  salt: String,
  id: String,
  setPassword(password: string): boolean,
  validatePassword(password: string): boolean,
  generateJWT(): JsonWebKey,
}

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true},
  email: { type: String, unique: true, lowercase: true },
  userType: 
  
  {
    type: String,
  default:"standard",
  },
  
  passwordHash: String,
  salt: String,
  id: { type: String, getter: function(val) { return this._id.toString(); }, unique: true }
},
{
  id: false //non virtual
});

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  // console.log('HASH:', hash);
  // console.log('passwordHASH:', this.passwordHash);
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id.toString(),
    _id: this._id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET, {expiresIn: '2 days'});
});

UserSchema.pre('save', function(next) {
    this.id = this._id;
    next();
});

export default mongoose.model<IUser>("User", UserSchema);
