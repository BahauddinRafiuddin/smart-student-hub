import mongoose from "mongoose";
import {ErrorResponse} from "../util/index.js";

const errorHandler = (err, req, res, next) => {
  // mongoose Database Error
  if(err instanceof mongoose.Error.CastError)
    err = new ErrorResponse(400,"Invalid resource ID");

  //duplicate key
  if(err.code === 11000){
    const field = Object.keys(err.keyValue);
    err = new ErrorResponse(400,`Duplicate value for Field: ${field}`);
  }

  //Validation error
  if(err instanceof mongoose.Error.ValidationError){
    const message = Object.values(err.errors).map(val=> val.message);
    err = new ErrorResponse(400,message.join(", "));
  }

  // make response object for errors
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error.",
  };

  if (process.env.NODE_ENV) {
    errorResponse.stack = err.stack;
  }

  console.error(`[Error] ${err.message} - ${req.method} ${req.path} ${Date()}`);
  res.status(statusCode).json(errorResponse);
}; 

export { errorHandler };
