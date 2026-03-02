const mongoose=require("mongoose");
const { DATABASE_URI } = require("./env.config");
const { DB_NAME } = require("../constant/dbContants");

async function connectedDb() {
  try {
  const connectedMyd=await mongoose.connect(`${DATABASE_URI}/${DB_NAME}`)

    console.log(`mongoDb is connected :${connectedMyd.connection.host}`)
  } catch (error) {
  console.error(" mongoDB Connection Failed:");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { connectedDb };
