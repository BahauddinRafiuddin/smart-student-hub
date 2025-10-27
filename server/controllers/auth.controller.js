import { asyncHandler } from "../util/index.js"; // util
import {
  PersonModel,
  StudentModel,
  StaffModel,
  FacultyModel,
  RoleModel,
} from "../models/index.js"; // model

const register = asyncHandler(async (req, res, next) => {
  // let {
  //   email,
  //   phone,
  //   role_id,
  //   first_name,
  //   middle_name,
  //   last_name,
  //   gender,
  //   Birth_date,
  //   profile_image,
  //   hash_password,
  // } = req.body;
  let body = req.body,
    user;

  let isUserExist = await PersonModel.findOne({ email: body?.email });
  if (isUserExist) {
    return res.status(400).json({
      success: false,
      messagee: "User already exists",
    });
  }

  let isRoleExist = await RoleModel.findById(body.role_id);
  if (!isRoleExist) {
    return res.status(400).json({
      success: false,
      messagee: "Invalid role assign",
    });
  }

  let role = String(isRoleExist.role_name).toLowerCase();
  if (role == "admin") {
    user = await PersonModel.create(body);
  } else if (role == "student") {
    user = await StudentModel.create(body);
  } else if (role == "staff") {
    user = await StaffModel.create(body);
  } else if (role == "faculty") {
    user = await FacultyModel.create(body);
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: isRoleExist.role_name,
      name: user.getFullName(),
    },
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const user = await PersonModel.findOne({ email }).populate("role_id");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  res.cookie("api_key", user.createJWT(), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 5,
  });

  const userObj = user.toObject();
  delete userObj["hash_password"];

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: userObj,
  });
});

export { register, login };
