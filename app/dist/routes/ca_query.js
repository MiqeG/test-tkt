const db = require("../db/db");

module.exports = async function (req, res) {
  try {
    return res.json(
      await db.query({
        IndexName: "year-ca-index",
        ScanIndexForward: req.body.ScanIndexForward,
        KeyConditionExpression: "#year = :y AND #ca BETWEEN :low  AND :high",
        ExpressionAttributeNames: {
          "#ca": "ca",
          "#year": "year",
        },
        ExpressionAttributeValues: {
          ":high": req.body.high,
          ":low": req.body.low,
          ":y": req.body.year,
        },
        Limit: req.body.Limit,
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
