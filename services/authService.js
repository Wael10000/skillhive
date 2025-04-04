const User = require('../models/authModel');
const bcrypt = require('bcrypt');


exports.signup = async (data) => {
 try {
 

    const user = await User.create({
      username: data.username,
        email: data.email,
        password: data.password,
         confirmpassword: data.confirmpassword,
   
    });
    return user;
 }catch(err){
    throw new Error(err.message);
 }
}
exports.login = async (data) => {
  try {
    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new Error('User not found');
    } else {
      const correct = await bcrypt.compare(data.password, user.password);
      if (!correct) {
        throw new Error('Incorrect password');
      }
    }
      return user;
   } catch (err) {
    throw new Error(err.message);
   }};  

