//DataBase Access

const aws = require("aws-sdk");
aws.config.update({ region: require("../../../env.json").REGION });
const docClient = new aws.DynamoDB.DocumentClient();
const dynamoDb = new aws.DynamoDB();
const dataVerificationModel = {
  name: "name",
  sector: "sector",
  siren: 99999999,
  ca: 1111111,
  margin: 1111111,
  ebitda: 1111111,
  loss: 1111111,
  year: 2017,
};
const params = require("./table_params");

module.exports.get_entreprise = async (siren, year) => {
  return docClient
    .get({
      TableName: params.TableName,
      Key: {
        siren: siren,
        year: year,
      },
    })
    .promise();
};
//PUT EXPECTS item to be dataVerificationModel compliant
module.exports.put = async (item) => {
  if (!verifyData(item, dataVerificationModel))
    throw new Error("Bad Entreprise Data Format");
  else
    return docClient.put({ TableName: params.TableName, Item: item }).promise();
};
module.exports.scan = async (reqBody) => {
  const scanParams = {
    TableName: params.TableName,
    ...reqBody,
  };
  return docClient.scan(scanParams).promise();
};
module.exports.query = async (reqBody) => {
  const queryParams = {
    TableName: params.TableName,
    ...reqBody,
  };
  return docClient.query(queryParams).promise();
};
function verifyData(item, model) {
  for (let key in model) {
    const verif = model[key];
    const toVerif = item[key];
    if (typeof verif != typeof toVerif) return false;
    if (typeof verif == "object") {
      return verifyData(toVerif, verif);
    }
  }
  return true;
}
module.exports.create = async function () {
  try {
    return await dynamoDb.createTable(params).promise();
  } catch (error) {
    console.error("Table creation error : ", error);
  }
};
