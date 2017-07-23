const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({

    email: {type: String, required: true, unique: true, lowercase: true},
    username: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true}

});

UserSchema.pre('save',function (next) {
  if(!this.isModified('password'))
    return next();
  var user = this; 
  bcrypt.hash("bacon", null, null, function(err, hash) {
    if(err) return next(err);  
    user.password = hash;
    console.log("Password: "+user.password);
    next();   
  });
})

module.exports = mongoose.model('User',UserSchema);

