

const express = require("express");
const {UserModel} = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.post("/register", async (request, response) =>
{
    const {email, pass, name, age} = request.body;
    try {

        bcrypt.hash(pass, 6, async (err, hash) =>
        {
            if(err)
            {
                console.log(err);
            }
            else 
            {
                const user =  new UserModel({email, pass:hash, name, age})
                await user.save()
                response.send("Data Registered")
            }
            
        });
        
    } catch (error) {

        response.send("Error in Registering")
        console.log(error)
    }

    
})


userRouter.post("/login", async  (request, response) =>
{
    const {email, pass} = request.body;

    try {
        const user = await UserModel.find({email})
        if(user.length > 0)
        {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if(result)
                {
                    const token = jwt.sign({ userID: user[0]._id }, 'snigdha');
                    response.send({"msg":"Logged In Successful", "token": token})
                }
                else
                {
                    response.send("Error in Login")   
                }
            });
        }
        else 
        {
            response.send("Error in Login")   
        }
        console.log(user)

        
    } catch (error) {

        response.send(error)
        console.log(error)
        
    }
   
})

module.exports = {userRouter}