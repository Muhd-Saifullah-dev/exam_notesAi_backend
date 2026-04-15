const { pdfDownload } = require("../controller/pdf.controller")
const { Authenticated } = require("../middleware/auth.middleware")

const pdfRoute=require("express").Router()



pdfRoute.post("/",Authenticated,pdfDownload)


module.exports=pdfRoute