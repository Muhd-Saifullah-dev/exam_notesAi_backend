const mongoose  = require("mongoose");

const userschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },  
    
    email:{
        type:String,
        required:true,
        unique:true

    },  
    credits:{
        type:Number,
        default:50,
        min:0
    },
      isCreditAvailable:{
        type:Boolean,
        required:true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Notes",
        default:[]
    }
},{timestamps:true})

const User=mongoose.models.User || mongoose.model("User",userschema)

module.exports=User