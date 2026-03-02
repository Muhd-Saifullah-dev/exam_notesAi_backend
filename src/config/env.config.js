const path=require("path")

require("dotenv").config({
    path:path.resolve(__dirname,"../../.env")
})


module.exports={
    PORT:process.env.PORT || 3000,
    DATABASE_URI:process.env.DATABASE_URI

}