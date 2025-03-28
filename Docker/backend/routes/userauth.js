import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { sign } from "../model/usermodel.js";


dotenv.config();
const userauth=Router();


userauth.post('/signup',async(req,res)=>{
    try{

        const {Username,Email,Password}=req.body

        const existingUser=await sign.findOne({USERNAME:Username})

        if (existingUser){
            res.status(400).send("User already exists.")
        }
        else{

        const newpassword=await bcrypt.hash(Password,10)

        const newuser=new sign({

            USERNAME:Username,
            EMAIL:Email,
            PASSWORD:newpassword
            

        })

        await newuser.save();
        res.status(201).json({message:"Signup Successfully"});

        }
    }

    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server error."})
        
    }


})

userauth.post('/login',async(req,res)=>{

    try{

        const {Username,Password}=req.body;

        const r1=await sign.findOne({USERNAME : Username})

        if(!r1){
            res.status(401).send("User not Found.");
        }

        else{
            // console.log(r1.newpassword);
            const valid=await bcrypt.compare(Password,r1.PASSWORD);
            console.log(valid);
        

            if(valid){
                const Token =jwt.sign({UserName:Username},process.env.SECRET_KEY,{expiresIn:'1hr'});
                console.log(Token);
            

            res.cookie("authToken",Token,
                {
                    httpOnly:true
                });
        
            res.status(200).json({message:"logged in successfully"})
            }

            else {
                res.status(401).send('unauthorized access')
            }

}

    }

    catch{
        res.status(500).send("Internal server error")
    }

})




userauth.get('/logout',(req,res)=>{

    res.clearCookie("authToken"),
    res.status(201).send("Logout successfully")

})


export {userauth}