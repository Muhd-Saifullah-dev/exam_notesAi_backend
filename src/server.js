const app = require("./app");
const { PORT } = require("./config/env.config");

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
