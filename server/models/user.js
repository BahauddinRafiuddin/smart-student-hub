import mongoose from "mongoose";

//options
const options = {
  discriminatorKey: "kind",
  collection: "User",
  timestamps: true,
};

//enums
const employeeTypeEnum = ["full time", "part time", "contract"];
const employeeStatus = ["active", "inactive", "on leave"];
const staffShift = ["monring", "afternoon"];

//person 
const personSchema = new mongoose.Schema(
  {
    contac_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    Birth_date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    profile_image: {
      type: String,
    },
    hash_password: {
      type: String,
      required: true,
    },
  },
  options
);

//student
const studentSchema = mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrollment_no: {
    type: String,
    required: true,
  },
  enrollment_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  graduation_year: {
    type: Number,
    required: true,
  },
  current_semester: {
    type: Number,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
});

//employee
const employeeSchema = new mongoose.Schema({
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Department",
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    enum: employeeTypeEnum,
    required: true,
  },
  joining_date: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  working_hours: {
    type: Number,
    required: true,
  },
  salary: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    enum: employeeStatus,
    required: true,
  },
});

//staff
const staffSchema = new mognoose.Schema({
  shift: {
    type: String,
    enum: staffShift,
    required: true,
  },
  skill: [String],
});

//faculty
const facultySchema = new mongoose.Schema({
  office_number: {
    type: String,
    required,
  },
  specialization: {
    type: String,
  },
});

const Person = mongoose.model("Person", personSchema);
const Student = Person.discriminator("Student", studentSchema);
const Employee = Person.discriminator("Employee", employeeSchema);
const Staff = Employee.discriminator("Staff", staffSchema);
const Faculty = Employee.discriminator("Faculty", facultySchema);

export { Person, Student, Employee, Staff, Faculty };
