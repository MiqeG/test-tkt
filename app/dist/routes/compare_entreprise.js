const db = require("../db/db");

module.exports = async function (req, res) {
  try {
    return res.json(
      await db.query({
        IndexName: "name-index",
        KeyConditionExpression: "#n = :n",
        ExpressionAttributeNames: {
          "#n": "name",
        },
        ExpressionAttributeValues: {
          ":n": req.body.name,
        },
        ExclusiveStartKey: req.body.LastEvaluatedKey,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        error.message || error.stack || error.code || "Internal server error !"
      );
  }
};
