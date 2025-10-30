import { asyncHandler, ErrorResponse } from "../util/index.js";
import { CourseMode } from "../models/index.js";

const createCourse = asyncHandler(async (req, res, next) => {
  const { name, code, duration_in_year, total_semester, department_id } = req.body;

  if (
    name == "" ||
    code == "" ||
    duration_in_year == "" ||
    total_semester == "" ||
    department_id == ""
  )
    throw new ErrorResponse(400, "Invalide details.");

  const course = await CourseMode.create({
    name,
    code,
    duration_in_year,
    total_semester,
    department_id,
  });

  return res.status(200).json({
    success: true,
    message: "Course created successfuly.",
    data: {
      name: course.name,
      code: course.code,
      duration_in_year: course.duration_in_year,
      total_semester: course.duration_in_year,
    },
  });
});

const updateCourse = asyncHandler(async (req, res, next) => {
  const { name, code, duration_in_year, total_semester, department_id } = req.body;
  const id = req.params?.id;
  if (
    name == "" ||
    code == "" ||
    duration_in_year == "" ||
    total_semester == "" ||
    department_id == "" ||
    !id
  )
    throw new ErrorResponse(400, "Invalide details.");

  const hasCourse = await CourseMode.findById(id);

  if (!id)
    throw new ErrorResponse(400, "Course Not Found.");

  const updatedCourse = await CourseMode.findByIdAndUpdate(id, {
    name,
    code,
    duration_in_year,
    total_semester,
    department_id
  }, { new: true });

  return res.status(200).json({
    success: true,
    message: "Course Updated successfuly.",
    data: {
      name: updatedCourse.name,
      code: updatedCourse.code,
      duration_in_year: updatedCourse.duration_in_year,
      total_semester: updatedCourse.duration_in_year,
    },
  });
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  const id = req.params?.id;

  if (!id)
    throw new ErrorResponse(400, "Course Not Found.");

  const hasCourse = await CourseMode.findById(id);

  if (!hasCourse)
    throw new ErrorResponse(400, "Course Not Found.");

  const deletedCourse = await CourseMode.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Course Deleted successfuly.",
    data: {
      name: deletedCourse.name,
      code: deletedCourse.code,
    },
  });
});

const getCourse = asyncHandler(async (req, res, next) => {
  const id = req.params?.id;

  if (!id)
    throw new ErrorResponse(400, "Course Not Found.");

  const course = await CourseMode.findById(id);

  if (!course)
    throw new ErrorResponse(400, "Course Not Found.");

  return res.status(200).json({
    success: true,
    message: "Course Found successfuly.",
    data: {
      name: course.name,
      code: course.code,
      duration_in_year: course.duration_in_year,
      total_semester: course.duration_in_year,
    },
  });
});

const getAllCourse = asyncHandler(async (req, res, next) => {
  const courses = await CourseMode.find();

  return res.status(200).json({
    success: true,
    message: "Courses Found successfuly.",
    data: {
      courses
    },
  });
});

export { createCourse, updateCourse, deleteCourse, getCourse, getAllCourse };
