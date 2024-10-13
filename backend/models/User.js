// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true, // Ensure usernames are unique
//     trim: true,
//   }, 
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensure email addresses are unique
//     lowercase: true, // Convert email to lowercase
//     validate: {
//       validator: (value) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
//         return emailRegex.test(value);
//       },
//       message: 'Invalid email format',
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6, // Minimum password length
//   },
// }, {
//   timestamps: true, // Automatically create createdAt and updatedAt fields
// });

// // Pre-save hook to hash the password before saving to the database
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) { // Only hash the password if it has been modified
//     const salt = await bcrypt.genSalt(10); // Generate a salt
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//   }
//   next();
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password); // Compare given password with stored hash
// };

import mongoose from "mongoose"
  

const userSchema=new mogoose.schema({
  name:{type:string,unique:true},
  email:{type:string,unique:true},
  password:{type:string,required:true},
  cartData:{type:string,required:true},

},{minnimize:false})



// Create and export the User model
const userModel = mongoose.model('User', userSchema);
export default userModel;
