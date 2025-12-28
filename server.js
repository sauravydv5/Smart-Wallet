require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

// connect DB and start server
connectDB()
  .then(() => {
    console.log("Database Connected successfully...");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running Successfully on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected..", err);
    process.exit(1);
  });
