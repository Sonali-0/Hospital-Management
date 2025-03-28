import { User } from "../model/UserSchema.js";
import { catchAsycnErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard admin users
export const isAdminAuthenticated = catchAsycnErrors(async (req, res, next) => {
  // Check for admin token in cookies
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Dashboard User is not authenticated!", 400));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("Admin not found!", 404));
    }

    // Check if the user is an admin
    if (user.role !== "Admin") {
      return next(new ErrorHandler(`${user.role} not authorized for this resource!`, 403));
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});

// Middleware to authenticate frontend patients
export const isPatientAuthenticated = catchAsycnErrors(async (req, res, next) => {
  // Check for patient token in cookies
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    // Check if the user is a patient
    if (user.role !== "Patient") {
      return next(new ErrorHandler(`${user.role} not authorized for this resource!`, 403));
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return next(new ErrorHandler("Invalid or expired token!", 401));
  }
});

// Role-based authorization middleware
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403));
    }
    next();
  };
};


