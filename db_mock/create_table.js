const db = require("../app/dist/db/db");
creatTable();
async function creatTable() {
  try {
    console.log(await db.create(), "DataBase Created !");
  } catch (error) {
    console.error("DB CREATION ERROR ", error);
  }
}
