const AdminUser = require('../models/user-model'); 
const Alumni = require('../models/alumni-model');
const Student = require('../models/student-model');

//get all users from the database 
const getAllStudents = async (req, res) =>{
    try {
        const students = await Student.find({},{password:0}); //as we don't want password to show
        if(!students || students.length===0){
            return res.status(404).json({message:"No Students Found"});
        }
        return res.status(200).json(students);
    } catch (error) {
        console.log(error);
    }
};

//get all contacts from the database
const getAllAlumnis = async (req, res)=>{
    try {
        const alumnis = await Alumni.find({},{password:0});
        if(!alumnis || alumnis.length===0){
            return res.status(404).json({message:"No Alumnis Found"})
        }
        return res.status(200).json(alumnis);
    } catch (error) {
        next(error); 
    }
};


module.exports = {
    getAllStudents,
    getAllAlumnis
};
