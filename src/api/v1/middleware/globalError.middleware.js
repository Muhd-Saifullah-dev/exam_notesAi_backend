const Responses=require("@constant/responses")
const responses=new Responses()

const globalErrorMiddleware=async(err,req,res,next)=>{
    const errMsg=err.message ?? "Internal Server Error"
    const status=err.status ?? 500
    return res.json(responses.generic_error(status,errMsg))
}

module.exports=globalErrorMiddleware