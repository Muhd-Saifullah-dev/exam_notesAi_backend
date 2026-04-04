const { asyncHandler } = require("@constant/asyn_handler");
const Responses = require("@constant/responses");
const responses = new Responses();
const getCurrentUser = asyncHandler(async (req, res, next) => {
 try {
   const userId = req.id;
   const user = req.user;
   console.log("userign",user)
   return res.json(responses.ok_response(user, "user fetched successfully"));
 
 } catch (error) {
  console.log(error)
 }
});


module.exports={getCurrentUser}