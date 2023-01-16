

const express = require("express");
const {connection}  = require("./configs/db")

const {userRouter} = require("./routes/User.route")
const {noteRouter} = require("./routes/Note.route");
const { authenticate } = require("./middlewares/authenticate.middleware");

const app = express();
app.use(express.json())





app.get("/", (request, response) =>
{
    response.send("Hello From Snigdha And Anjali")
})

app.use("/users", userRouter)
//app.use(authenticate)
app.use("/notes", noteRouter)


// {
//     "title":"Sandeeep",
//     "note":"Ye Note Hai",
//     "category":"Pata Nahi",
//     "author":"Sandeep bhai"
    
    
//   }


// app.get("/data", (request, response) =>
// {
//     const token = request.query.token
//       or  const token = request.headers.authorization
//     jwt.verify(token, 'snigdha', (error, decoded) =>
//     {
//         if(error)
//         {
//             response.send("Please LOgin First")
//             console.log(error)
//         }
//         else
//         {
//             response.send("Here is your Data")
//         }
//     });
      
// })


app.listen(4500, async () =>
{
    try {

        await connection;
        console.log("Connected To DB")

        
    } catch (error) {

        console.log("Can't Connect")
        console.log(error)
    }
    console.log("Running at port 4500")
})