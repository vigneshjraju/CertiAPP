const adminchec=(req,res,next)=>{

    if(req.Userole="Admin"){
        next();

    }
    else {
        res.status(403).send("You are not allowed to do this")
    }

}

export default adminchec