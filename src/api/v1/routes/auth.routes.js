const { googleAuth, logout } = require("../controller/auth.controller")

const authRoute=require("express").Router()




authRoute.post("/google",googleAuth)
authRoute.get("/logout",logout)

module.exports=authRoute