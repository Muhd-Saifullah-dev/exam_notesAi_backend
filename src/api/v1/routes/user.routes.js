const { getCurrentUser } = require("../controller/user.controller")
const { Authenticated } = require("../middleware/auth.middleware")

const userRoute=require("express").Router()


userRoute.get("/",Authenticated,getCurrentUser)

module.exports=userRoute