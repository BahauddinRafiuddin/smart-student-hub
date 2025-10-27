import { asyncHandler } from "../util/index.js";
import { DepartmentModel } from "../models/index.js";

const createDepartment = asyncHandler(async (req, res, next) => {
  const { name, code } = req.body;

  if (name == "" || code == "") {
    return res.status(400).json({
      success: false,
      message: "Invalide details.",
    });
  }

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

export { createDepartment };
