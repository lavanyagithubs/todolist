//import express module
const exp = require("express");
const userApiObj = exp.Router();

//import async error handler
const asyncErrHandler = require("express-async-handler");

//import jsonwebtoken module
const jwt = require("jsonwebtoken");
//const verifyToken =require("./middlewares/verifyToken")

//import bcryptjs
const bcryptjs = require("bcryptjs");

//import cloudinary
/*const cloudinary = require("cloudinary").v2;

//import multer-storage-cloudinary
const {CloudinaryStorage} = require("multer-storage-cloudinary");

//import multer
const multer = require("multer");

//configure cloudinary
cloudinary.config({ 
    cloud_name: 'db4d77l5r', 
    api_key: '615372751886964', 
    api_secret: 'DSvT5hPnwmL6rogCT1SvVMvblrw' 
  });

//configure cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cdb37',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });*/


//extract the body of req obj
userApiObj.use(exp.json());

//post req handler for user register
userApiObj.post("/register", asyncErrHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObject = req.app.get("userCollectionObject");
    console.log("user obj is",req.body)
    //console.log("user object is",req.body);
    //let userObj =  JSON.parse(req.body.userObj)
    let userObj = req.body;

    //check for user in db
    let user = await userCollectionObject.findOne({username:userObj.username});

    //if username alreaddy taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
        //hash the password
        let hashedpswd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpswd;

         //add userImagelink
         //userObj.userImgLink = req.file.path;

        //create user
        let success = await userCollectionObject.insertOne(userObj);
        res.send({message:"user created"});
    }
   // console.log("user obj is",req.body);
}))



//user login
userApiObj.post("/schedule",asyncErrHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObject = req.app.get("userCollectionObject");

    let userCredObj = req.body;
    //verify  username
    let user = await userCollectionObject.findOne({username:userCredObj.username})

    if(user == null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({username:user.username},process.env.secret,{expiresIn:10});

            //send token
            res.send({message:"success",signedToken:token,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))
//get user

//adding to do list
userApiObj.post("/dashboard", asyncErrHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObject = req.app.get("userCollectionObject");
    console.log("user obj is",req.body)
    //console.log("user object is",req.body);
    //let userObj =  JSON.parse(req.body.userObj)
    let userObj = req.body;

    //check for user in db
    let user = await userCollectionObject.findOne({username:userObj.username});

    //if username alreaddy taken
    if(user!==null){
        
        let success = await userCollectionObject.insertOne(userObj);
        res.send({message:"list added"});
    }
    else{
        
        res.send({message:"user not created"});
    }
   // console.log("user obj is",req.body);
}))
userApiObj.get("/display",asyncErrHandler(async (req,res,next)=>{
    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObject")
    
   let userObj=await userCollectionObject.find({username:req.params.username})
   res.send({message:"success",user:userObj})
  
}))



//export
module.exports = userApiObj;