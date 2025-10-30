import mongoose from "mongoose";
import { RoleModel, TableModel } from "../models/index.js";

const connectDatabase = async (params) => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database Is Connected")
    );

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ mongoDB Database Disconnected.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 mongoDB Database reconnected.");
    });

    mongoose.connection.on("error", (error) => {
      console.log("❌ mongoDB Database connection failed.", error.message);
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/studentHub`);
    preEntries(); // pre databse entry
  } catch (error) {
    console.log("❌ mongoDB Database connection failed.", error.message);
    process.exit(1);
  }
};

async function preEntries() {
  try {
    const roles = ["admin", "student", "staff", "faculty"];
    for (const name of roles) {
      const isExisting = await RoleModel.findOne({ role_name: name });

      if (!isExisting) {
        await RoleModel.create({
          role_name: name,
        });
      }
    }

    const tables = [
      "Addresses",
      "Contacts",
      "Persons",
      "Tables",
      "Roles",
      "Permissions",
      "Students",
      "Employees",
      "Facultys",
      "Staffs",
      "AcademicRecords",
      "Departments",
      "Courses",
    ];

    for (const name of tables) {
      const isExisting = await TableModel.findOne({ table_name: name });

      if (!isExisting) {
        await TableModel.create({
          table_name: name,
        });
      }
    }

    console.log("preEntries Done..!");
  } catch (error) {
    console.log("Something wrong with preEntries....");
    console.log(error.message);
  }
}
export default connectDatabase;
