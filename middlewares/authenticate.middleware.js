const jwt = require("jsonwebtoken")

const authenticate = (request, response, next) =>
{
     const token  = request.headers.authorizaton
     if(token)
     {
        const decoded = jwt.verify(token, "snigdha")
        if(decoded)
        {
            const userID = decoded.userID
            request.body.userid = userID
            next()
        }
        else
        {
            response.send("Please LOgin FIrst")
        }
     }
     else
     {
         response.send("Please LOgin FIrst")
     }

}

module.exports={authenticate}