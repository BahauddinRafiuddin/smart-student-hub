import { asyncHandler, ErrorResponse } from "../util/index.js";
import {RoleModel, TableModel, PermissionModel} from "../models/index.js";

//role
const getAllRole = asyncHandler(async (req, res, next) => {
    const roles = await RoleModel.find();

    res.status(200).json({
        success:true,
        message:"Roles Found successfuly",
        data:[...roles]
    });
});


//table
const getAllTable = asyncHandler(async (req, res, next) => {
    const tabels = await TableModel.find();

    res.status(200).json({
        success:true,
        message:"Tables Found successfuly",
        data:[...tabels]
    });
});

//permission
const getAllPermission = asyncHandler(async (req, res, next) => {
    const tabels = await PermissionModel.find().populate("role_id").populate("table_id");

    res.status(200).json({
        success:true,
        message:"Tables Found successfuly",
        data:[...tabels]
    });
});

export { 
    //role
    getAllRole,
    //table
    getAllTable,
    //permission
    getAllPermission
} 
