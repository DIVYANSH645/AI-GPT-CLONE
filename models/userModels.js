// Import necessary packages
import mongoose from 'mongoose'; // Import Mongoose for MongoDB interactions
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation

// Define the user schema
const userSchema = new mongoose.Schema({
    // Define username field with type String and required validation
    username: {
      type: String,
      required: [true, "Username is Required"],
    },

    // Define email field with type String, required validation, and uniqueness constraint
    
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    // Define password field with type String, required validation, and minimum length constraint
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length should be 6 character long"],
    },
    // Define customerId field with type String and default value
    customerId: {
      type: String,
      default: "",
    },
    // Define subscription field with type String and default value
    subscription: {
      type: String,
      default: "",
    },
  });

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
    // Check if the password is modified
    if (!this.isModified("password")) {
      next();
    }
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
// Method to compare passwords
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
// Method to generate signed tokens
userSchema.methods.getSignedToken = function (res) {
    // Generate access token
    const accessToken = jwt.sign(
      { id: this._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIREIN}
    );
    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: this._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_EXPIREIN}
    );
    // Set refresh token in response cookie
    res.cookie("refreshToken", `${refreshToken}`, {
      maxAge: 86400 * 7000,
      httpOnly: true,
    });
  };
  
// Create User model from the schema
const User = mongoose.model("User", userSchema);

// Export User model
export default User;
