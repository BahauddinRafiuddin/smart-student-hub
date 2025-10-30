import { asyncHandler, ErrorResponse } from "../util/index.js";
import { DepartmentModel } from "../models/index.js";

const createDepartment = asyncHandler(async (req, res, next) => {
  const { name, code } = req.body;

  if (name == "" || code == "")
    throw new ErrorResponse(400, "Invalide details.");

  const department = await DepartmentModel.create({
    name,
    code,
  });

  return res.status(200).json({
    success: true,
    message: "Department created successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const updateDepartmnet = asyncHandler(async (req, res, next) => {
  const { name, code } = req.body;
  const departmentID = req.params.id;

  const hasDepartment = await DepartmentModel.findById(departmentID);
  if (!hasDepartment) throw new ErrorResponse(400, "Department Not found.");

  const department = await DepartmentModel.findByIdAndUpdate(departmentID, {
    name: name,
    code: code,
  },{new:true});
  department.save();

  return res.status(200).json({
    success: true,
    message: "Department Update successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const deleteDepartment = asyncHandler(async (req, res, next) => {
  const departmentID = req.params.id;

  const hasDepartment = await DepartmentModel.findById(departmentID);
  if (!hasDepartment) throw new ErrorResponse(400, "Department Not found.");

  const department = await DepartmentModel.findByIdAndDelete(departmentID);

  return res.status(200).json({
    success: true,
    message: "Department deleted successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const getDepartment = asyncHandler(async (req, res, next) => {
  const departmentID = req.params.id;

  const department = await DepartmentModel.findOne({_id:departmentID});
  if (!department) throw new ErrorResponse(400, "Department Not found.");

  return res.status(200).json({
    success: true,
    message: "Department Got Successfuly.",
    data: {
      name: department.name,
      code: department.code,
    },
  });
});

const getAllDepartment = asyncHandler(async (req, res, next) => {
  const departments = await DepartmentModel.find().select("-__v");
  
  return res.status(200).json({
    success: true,
    message: "Department Got Successfuly.",
    data: {
      departments
    },
  });
});

export { createDepartment, getDepartment, getAllDepartment, updateDepartmnet, deleteDepartment };
