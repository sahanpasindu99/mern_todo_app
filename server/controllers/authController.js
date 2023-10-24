const User=require('../model/user')
const Todo=require('../model/todo')
const  {hashPassword,comparePassword} =require('../helpers/auth')
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");

const test=(req,res)=>{
    res.json('test is working');
}

const registerUser= async (req,res)=>{
    
    try {
        const {name,email,password}=req.body;
        const  exist=await User.findOne({email});
            if(exist){
                res.status(400).json({error:"email is already taken"})
            }
            else{
                const hashedPassword=await hashPassword(password)
                const user=await User.create({
                    name,
                    email,
                    password:hashedPassword
                })
            if(!user){
                res.status(400).json({error:"Registration Error"})
            }else{
                res.status(200).json({success:"Registered Successfully"})
            }
            }  
        
        
    } catch (error) {
        res.status(400).json({error:"Error Occured"})
    }
}

const validateUser=async(req,res)=>{
    const authHeader=req.headers['authorization']
    console.log(req.headers)
    if(authHeader){
        const token=authHeader.split(' ')[1]
        if(token){
        const verify=await jwt.verify(token,process.env.JWT_SECRET)
             if(verify){
                const users=await User.findOne({email:verify.email}).select("email")
                if(users){
                    console.log("checkuse",users)
                    res.status(200).json({user:users})
                }
                else{
                 res.status(400).json({error:"error1"})
                }
             }
             else{
                res.status(400).json({error:"error2"})
             }
        }
        else{ res.status(400).json({error:"error2"})}    
    }
    else{ res.status(400).json({error:"error3"})}  
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
       console.log(email,password)
        const user =await User.findOne({email:email});
        if(!user){
            res.status(404).json({error:"No user found"})
        }
        else{
            const match=await comparePassword(password,user.password)
            if(match){
             jwt.sign({email:user.email,id:user._id, name:user.name},process.env.JWT_SECRET,{expiresIn:"10h"},(err,token)=>{
                if(err) {
                    res.status(400).json({error:"Error"})
                }
               res.status(200).json({user:{_id:user._id,email:user.email},token:token})
             } )
            }
            else{
                res.status(400).json({error:"password not matched"})
            } 
        }
           
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:"Error occured"})
    }
}

const forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("recipient email", email);
      
      const users = await User.find({ email });
  
      if (users.length === 0) {
        res.status(404).json({ error: "No user found" });
      } else {
        const user = users[0];
  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "10h"});
  
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'romansurge255@gmail.com',
            pass: 'uesptnlywibebsni'
          }
        });
  
        var mailOptions = {
          from: 'romansurge255@gmail.com',
          to: email,
          subject: 'Reset Password Link',
          text: `http://localhost:5173/reset-password/${user._id}/${token}`
        };
  
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            res.status(400).json({ error: "Error occurred" });
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: "Email sent" });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Error occurred" });
    }
  }
  

const resetPassword=async(req,res)=>{
    const {id,token}=req.params
    const {newPassword}=req.body
    console.log(newPassword,token)

    try {
        jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
            if(err){
                 res.status(400).json({error:"error with token"})
            }
            else{
                const newhashedPassword=await hashPassword(newPassword)
               const updated =await User.findByIdAndUpdate({_id:id},{password:newhashedPassword})
               if(updated){
                res.status(200).json({message:"Updated Successfully"}) 

               }else{
                res.status(400).json({error:"Does not updated"})
               }
               }
            }
           )
    } catch (error) {
        res.status(400).json({error:"error occured"})
    }

   
}

const getProfile=(req,res)=>{
  const {token}=req.cookies
    try {
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
             if(err) {
                 res.status(400).json({err})
             }else{
                 res.status(200).json(user);
             }
            }
            )
     }else{
         res.status(400).json({error}) 
        }
    } catch (error) {
        res.status(500).json({ error: 'error' });
    }
   
}

const getItems=async(req,res)=>{
    try {
         const {email}=req.params
         console.log("passed",email)
         
            const todos = await Todo.find({email:email});
            if(todos){
            console.log(todos)
            res.status(200).json(todos);
            }
            else{
             res.status(500).json({ error: 'Failed to fetch Todo items' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch Todo items' });
          }   
}

const updateItem=async(req,res)=>{
    try {
        const {title}=req.body
        const {id}=req.params
        console.log("titlechange",title)
        
           const todos = await Todo.updateOne({_id:id},{title:title});
           if(todos){
           console.log(todos)
           res.status(200).json(todos);
           }
           else{
            res.status(500).json({ error: 'Failed to update Todo items' });
           }
         } catch (error) {
           console.error(error);
           res.status(500).json({ error: 'Failed to update Todo items' });
         }
}
const saveItem=async (req,res)=>{
    try {
        const {email,newTask}=req.body
        console.log(email,newTask)
        const todo=await Todo.create({
             email:email,
             title:newTask           
        })
        if(!todo){
          res.status(400).json({error:"Item adding  unsuccessful"})
        }
        else{
            res.status(200).json({todo})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to save Todo items' });
    }
}
const deleteItem=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("id",id)
        const deletion=await Todo.findOneAndDelete({ _id:id })
        if(!deletion){
            res.status(500).json({ error: 'Deletion unsuccessfull' });
        }
        else{
           res.status(200).json({success:"deleted successfully"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete Todo items' });
    }
}

const fetchUser=async(req,res)=>{
    try {
         const {email}=req.params
         console.log("useremail",email)
         
            const users = await User.findOne({email:email});
            if(users){
            console.log(users)
            res.status(200).json(users);
            }
            else{
             res.status(500).json({ error: 'Failed to fetch Todo items' });
            }
           
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch Todo items' });
          }
         
}
const updatePassword=async(req,res)=>{
    try {
        const {email,newPassword}=req.body;
        console.log("sent",email,newPassword)
        const hashedNewPassword=await hashPassword(newPassword)

        const updated = await User.updateOne({email:email},{password:hashedNewPassword});

        if(updated){
            res.status(200).json({success:"Updated Successfully"})
        }
        else{
            res.status(400).json({error:"Updating Error"})
        }
            
    } catch (error) {
        res.status(400).json({error:"Error"})
    }
}

module.exports={
    test,
    validateUser,
    registerUser,
    updatePassword,
    loginUser,
    forgetPassword,
    resetPassword,
    getProfile,
    getItems,
    updateItem,
    saveItem,
    deleteItem,
    fetchUser
 
}