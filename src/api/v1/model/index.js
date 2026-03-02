const fs = require("fs");
const path = require("path");

const folderPath = __dirname;

fs.readdirSync(folderPath).forEach((file) => {
  const fullPath = path.join(folderPath, file);

  // index.js skip karo
  if (file === "index.js") return;

  // Sirf .js files load karo
  if (file.endsWith(".js")) {
    require(fullPath);
    console.log("Model loaded:", file);
  }
});