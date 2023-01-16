

const express = require("express")
const {NoteModel} = require("../models/Note.model")

const noteRouter = express.Router()

noteRouter.get("/", (request, response) =>
{
    response.send("All The Notes")
})


noteRouter.post("/create", async  (request, response) =>
{
    const payload = request.body
    try {

        const new_note = new NoteModel(payload)
        await new_note.save()
        response.send("Created Notes")
        
    } catch (error) {
        console.log(error)
        response.send("Something went wrong!!")
        
    }
   
})


noteRouter.patch("/update/:id", async  (request, response) =>
{
    const payload = request.body
    const id = request.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note  = note.userID
    const userID_making_req  = request.body.userID
    try {
        if(userID_making_req != userID_in_note)
        {
            response.send("You are not authorized")
        }
        else
        {
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            response.send("Notes Updated")

        }
       } catch (error) {

        console.log(error)
        response.send("Error while Updating")
     }
    
})


noteRouter.delete("/delete/:id", async (request, response) =>
{
    const id = request.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note  = note.userID
    const userID_making_req  = request.body.userID
    try {
        if(userID_making_req != userID_in_note)
        {
            response.send("You are not authorized")
        }
        else
        {
            await NoteModel.findByIdAndDelete({"_id":id})
            response.send("Notes Deleted")

        }
       } catch (error) {

        console.log(error)
        response.send("Error while Deleting")
     }
    
    
})




module.exports={noteRouter}