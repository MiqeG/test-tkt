const db = require("../db/db");

module.exports = async function (req, res) {
  try {
    return res.json(await db.scan(req.body));
  } catch (error) {
    return res
      .status(500)
      .json(
        error.message || error.stack || error.code || "Internal server error !"
      );
  }
};
