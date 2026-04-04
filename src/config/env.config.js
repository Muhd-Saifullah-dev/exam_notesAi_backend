const path=require("path")

require("dotenv").config({
    path:path.resolve(__dirname,"../../.env")
})


module.exports={
    PORT:process.env.PORT || 3000,
    DATABASE_URI:process.env.DATABASE_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY
}