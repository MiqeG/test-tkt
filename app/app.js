const express = require("express");
const app = express();

//PARSE URL ENCODED AND JSON
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb", extended: true }));

//ROUTES POST
const get_entreprise = require("./dist/routes/get_entreprise");
const put_entreprise = require("./dist/routes/put_entreprise");
const scan_entreprise = require("./dist/routes/scan_entreprise");
const compare_entreprise = require("./dist/routes/compare_entreprise");
const query_entreprise = require("./dist/routes/query_entreprise");
const ca_query = require("./dist/routes/ca_query");

//GET ROUTES

app.get("/", (req, res) => {
  return res.json("Hello!");
});

//POST ROUTES

app.post("/get_entreprise", (req, res) => {
  return get_entreprise(req, res);
});
app.post("/put_entreprise", (req, res) => {
  return put_entreprise(req, res);
});
app.post("/scan_entreprise", (req, res) => {
  return scan_entreprise(req, res);
});
app.post("/query_entreprise", (req, res) => {
  return query_entreprise(req, res);
});
app.post("/compare_entreprise", (req, res) => {
  return compare_entreprise(req, res);
});
app.post("/ca_query", (req, res) => {
  return ca_query(req, res);
});

//404

app.use(function (req, res) {
  return res.status(404).send("Not found");
});

module.exports = app;
