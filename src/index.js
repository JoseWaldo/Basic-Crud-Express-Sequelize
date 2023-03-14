// This archive will be responsible of run application
import app from "./app.js";
import { sequelize } from "./database/database.js";

//import "./models/Project.js";
//import "./models/Task.js";

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Listening on ${URL}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
}

main();
