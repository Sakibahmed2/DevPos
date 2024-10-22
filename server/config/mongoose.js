import mongoose from "mongoose";
import config from "./index.js";
import app from "../server.js";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

    await mongoose.connect(`${config.mongodb_uri}`);
  } catch (err) {
    console.log(err);
  }
}

main();
