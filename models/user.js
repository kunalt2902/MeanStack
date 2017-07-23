const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email){
    return false;
  }else{
    if(email.length < 5 || email.lenght > 30){
      return false;
    }else{
      return true;
    }
  }
}

let emailExpressionValidator = (email) => {
  if(!email){
    return false;
  }else{
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
}

let userNameLengthChecker = (username) => {
  if(!username){
    return false;
  }else{
    if(username.length < 3 || username.lenght > 15){
      return false;
    }else{
      return true;
    }
  }
}

let userNameExpressionValidator = (username) => {
  if(!username){
    return false;
  }else{
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
}

let passwordLengthChecker = (password) => {
  if(!password){
    return false;
  }else{
    if(password.length < 8 || password.lenght > 35){
      return false;
    }else{
      return true;
    }
  }
}

let passwordExpressionValidator = (password) => {
  if(!password){
    return false;
  }else{
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
  }
}


const emailValidators = [
  {validator: emailLengthChecker, message: 'Email length should be between 5 and 30'},
  {validator: emailExpressionValidator, message: 'Invalid email format'}
];

const userNameValidators = [
  {validator: userNameLengthChecker, message: 'Username length should be between 3 and 15'},
  {validator: userNameExpressionValidator, message: 'Invalid username format'}
];

const passwordValidators = [
  {validator: passwordLengthChecker, message: 'Password length should be between 8 and 35'},
  {
    validator: passwordExpressionValidator, 
    message: 'Must have atleast one uppercase, lowercase, number and special characters'
  }
];
const UserSchema = new Schema({

    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    username: {type: String, required: true, unique: true, lowercase: true, validate: userNameValidators},
    password: {type: String, required: true, validate: passwordValidators}

});

UserSchema.pre('save',function (next) {
  if(!this.isModified('password'))
    return next();
  var user = this; 
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if(err) return next(err);  
    user.password = hash;
    next();   
  });
})

UserSchema.methods.comparePassword = ((password) => {

    var user = this;
    bcrypt.compareSync(user.password, password);

})

module.exports = mongoose.model('User',UserSchema);

