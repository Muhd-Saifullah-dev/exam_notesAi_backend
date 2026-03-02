require("module-alias/register");
const app = require("./app");
const { connectedDb } = require("@config/db");
const { PORT } = require("@config/env.config");


(async () => {
  await connectedDb()
    .then(() => {
      console.log(`server is connected with db`);
      app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
    })
    .catch((err) => {
      process.exit(1);
    });
})();
