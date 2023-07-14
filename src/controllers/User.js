import User from "../models/User.js";

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

// Get user by id (auth required)
export async function getUserById(req, res) {
  try {
    //here we have to get the id of the user from the url and then find the user with that id

    const id = req.params.id;

    const user = await User.findById(id).populate("tickets");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    const {
      firstName,
      lastName,
      registrationNumber,
      manipalEmailID,
      mobileNumber,
      isHosteller,
    } = req.body;

    const userExists = await User.findOne({ manipalEmailID });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      registrationNumber,
      manipalEmailID,
      mobileNumber,
      isHosteller,
    });

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

    const user = await User.findByIdAndUpdate(
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
