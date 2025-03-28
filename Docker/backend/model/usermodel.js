
import { Schema } from "mongoose";
import { model } from "mongoose";

const usersign=new Schema({

    USERNAME:{type:String,unique:true},
    EMAIL:{type:String},
    PASSWORD:{type:String,required:true}
    

})

const sign=model('Users',usersign);

export {sign}