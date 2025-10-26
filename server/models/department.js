import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    head_of_department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

export default mongoose.model("Department",departmentSchema);