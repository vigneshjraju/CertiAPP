import express,{json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './routes/userauth.js';
import { issue } from './routes/issuecertificate.js';
import mongoose from 'mongoose';


dotenv.config();
const certi=express();

certi.use(json());

certi.use('/',userauth);

certi.use('/',issue);




certi.listen(process.env.PORT,function(){
    
    console.log(`server is listening at ${process.env.PORT}`)
    
})

mongoose.connect('mongodb://mongodb:27017/Certiapp').then(()=>{

    console.log("Mongodb successfully connected to Certiapp");

})
.catch((error)=>{
    console.error("Mongodb connection failed",error);
    
})