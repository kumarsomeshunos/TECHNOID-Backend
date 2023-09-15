import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import validateCreateUser from "../utils/validators.js";
import bcrypt from "bcrypt";
import generateTokenUser from "../utils/generateTokenUser.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";

export async function getAllUsers(req, res) {
  try {
    // Get all users (auth required)
    // Pagination, Filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find(
      {},
      {
        isHosteller: true,
        approvedByAdmin: true,
        isAdmin: true,
      }
    )
      .populate("tickets")
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "All users data",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Get user by id, and logs in the user and generates token
export async function getUserById(req, res) {
  try {
    //here we have to get the id of the user from the url and then find the user with that id

    const id = req.params.id;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (req.body.password) {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      // if password matches then token is generated
      generateTokenUser(res, user._id);
      // if user is admin then admin token is also generated
      if (user.isAdmin === true) {
        generateTokenAdmin(res, user._id);
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Password not provided",
      });
    }
    user = user.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "User data",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Create new user
export async function createUser(req, res) {
  try {
    //here we have to first check if the user with that email id already exists or not
    //then check if all the required fields are present or not
    //then create the user

    const { error, value } = validateCreateUser(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed!",
        error: error.details,
      });
    }

    let mail = value.manipalEmailID;
    const userExists = await User.findOne({ mail });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    value.password = await bcrypt.hash(value.password, 10);
    let user = await User.create(value);
    user = user.toObject();
    delete user.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Update existing user (auth required)
export async function updateUser(req, res) {
  try {
    //here we have to first check if the user with that id exists or not
    //then check if all the required fields are present or not
    //then update the user

    const id = req.params.id;

    const {
      firstName,
      lastName,
      registrationNumber,
      manipalEmailID,
      mobileNumber,
      isHosteller,
    } = req.body;

    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        registrationNumber,
        manipalEmailID,
        mobileNumber,
        isHosteller,
      },
      { new: true }
    );
    user = user.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Delete existing user (auth required)
export async function deleteUser(req, res) {
  try {
    //here we have to first check if the user with that id exists or not
    //then delete the user

    const id = req.params.id;

    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    await Ticket.deleteMany({ author: id });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

export async function logoutUser(req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
}
