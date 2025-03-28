import { Schema } from "mongoose";
import { model } from "mongoose";

const Certificate=new Schema({

    COURSENAME:{type:String},
    COURSEID:{type:String,unique:true},
    CANDIDATENAME:{type:String,required:true},
    GRADE:{type:String},
    DESCRIPTION:{type:String},
    DATE:{type:String}
    
})

const Certi=model('Certificates',Certificate);

export {Certi}