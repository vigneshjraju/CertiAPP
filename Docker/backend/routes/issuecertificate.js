import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { Certi } from "../model/certificate.js";

const issue = Router();


issue.post('/issuecertificate',authenticate,async(req,res)=>{

    try {
  

            const {courseName,courseId,candidatename,grade,description,date} = req.body;

            const existingCourse= await Certi.findOne({COURSEID:courseId});

            if (existingCourse){
                res.status(400).send("User already exists.")
            }
            else{
    
            const newcourse=new Certi({
    
                COURSENAME:courseName,
                COURSEID:courseId,
                CANDIDATENAME:candidatename,
                GRADE:grade,
                DESCRIPTION:description,
                DATE:date

            })
    
            await newcourse.save();
            res.status(201).json({message:"Signup Successfully"});
    
            }
        }
    
        catch(error){
            console.error(error);
            res.status(500).json({message:"Internal Server error."})
            
        }

    } 
    
    
);

issue.patch('/editcertificate', authenticate, async (req, res) => {
    try {
        const { courseId, courseName, candidatename, grade, date } = req.body; // Extract courseId

        const r2 = await Certi.findOne({ COURSEID: courseId });

        if (r2) {
            
            r2.COURSENAME = courseName || r2.COURSENAME;
            r2.CANDIDATENAME = candidatename || r2.CANDIDATENAME;
            r2.GRADE = grade || r2.GRADE;
            r2.DATE = date || r2.DATE;

            await r2.save(); 

            return res.status(200).json({ message: "Certificate successfully edited.", certificate: r2 });

        } else {

            return res.status(404).json({ message: "Certificate not found." });

        }

    } 
    
    catch (error) {
        console.error("Error updating certificate:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }

});


  issue.get('/certificate/:certiid',authenticate,async(req,res)=>{

    try{

        const certis=req.params.certiid;

        const cert1= await Certi.findOne({COURSEID:certis});

        if(cert1){
            res.status(201).json({message:"Certificate successfully fetched",certificate:cert1});
            console.log("Certificate successfully fetched");
            
        }
        else{
            res.status(401).send("certificate not fetched")
        }

    }
    catch{
        res.status(500).send("Internal Server error")
    }


  })




export {issue};
