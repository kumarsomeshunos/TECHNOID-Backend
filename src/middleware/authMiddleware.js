import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      // checks if the user has a token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
});

const protectAdmin = asyncHandler(async (req, res, next)   => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      // checks if the user has an admin token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
});

export { protectUser, protectAdmin };
