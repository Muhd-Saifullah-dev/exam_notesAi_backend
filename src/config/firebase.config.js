var admin = require("firebase-admin");

const  serviceAccount = require("../serviceAccount/firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports=admin