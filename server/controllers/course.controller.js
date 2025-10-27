import { asyncHandler } from "../util/index.js";
import { CourseMode } from "../models/index.js";

const createCourse = asyncHandler(async(req, res, next)=>{
    const {name, code, duration_in_year, total_semester, department_id} = req.body;

    if(name == "" || code == "" || duration_in_year == "" || total_semester== "" || department_id == ""){
        return res.status(400).json({
            success:false,
            message:"Invalide details."
        });
    }

    const course = await CourseMode.create({
        name,
        code,
        duration_in_year,
        total_semester,
        department_id
    });

    return res.status(200).json({
        success:true,
        message:"Course created successfuly.",
        data:{
            name:course.name,
            code:course.code,
            duration_in_year:course.duration_in_year,
            total_semester:course.duration_in_year
        }
    });
});

export {
    createCourse
}