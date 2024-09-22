const User = require("../models/user-model");
const Student = require("../models/student-model");
const Alumni = require("../models/alumni-model");

//controller refers to a part of your code that is responsible for handling the application logic

// home page logic

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the authentication route page");
  } catch (error) {
    console.log(error);
  }
};

//helper function to find users in all the schemas 
const findUserByEmail = async (email) => {
  // Search for the user in User, Student, and Alumni collections
  const collections = [User, Student, Alumni];
  for (const Collection of collections) {
    const user = await Collection.findOne({ email });
    if (user) {
      return user; // Return the first matching user
    }
  }
  return null; // No user found
};

const register = async (req, res) => {
  try {

    const { username, email, phone, password, departmentId, about, role } = req.body;

    // Check if user already exists
    const userExist = await findUserByEmail(email);
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists." });
    }

    // Create the new user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: password,
      departmentId,
      about,
      role,
    });
    
    res.status(201).json({
      msg: "Registration Successful!",
      userId: userCreated._id.toString(),
      token: await userCreated.generateToken(),
    });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal server error." });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const userExist = await findUserByEmail(email);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = await userExist.generateToken(); // Assumes your User model has a token generation method
    console.log(userExist);

    res.status(200).json({
      msg: "Login Successful",
      role: userExist.role,
      token,
      user: userExist,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
