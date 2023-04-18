const request = require("supertest");
const app = require("./app");
describe("Post Endpoints", () => {
  it("it should get an entreprise", async () => {
    const res = await request(app).post("/get_entreprise").send({
      siren: 152617868,
      year: 2017,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.siren).toBe(152617868);
  });
  it("it should query entreprises", async () => {
    const res = await request(app)
      .post("/query_entreprise")
      .send({
        IndexName: "year-ca-index",
        ScanIndexForward: false,
        KeyConditionExpression: "#year = :y AND #ca BETWEEN :low  AND :high",
        ExpressionAttributeNames: {
          "#ca": "ca",
          "#year": "year",
        },
        ExpressionAttributeValues: {
          ":high": 1000000,
          ":low": 0,
          ":y": 2017,
        },
        Limit: 200,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.Items).not.toBeUndefined();
    expect(res.body.Items).not.toBe(0);
  });
  it("it should scan entreprises", async () => {
    const res = await request(app).post("/scan_entreprise").send({
      Limit: 200,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.Items).not.toBeUndefined();
    expect(res.body.Items).not.toBe(0);
  });
  it("it should put an entreprie", async () => {
    const res = await request(app)
      .post("/put_entreprise")
      .send({
        item: {
          year: 2017,
          siren: 100313670,
          ca: 1813138,
          ebitda: 913583,
          loss: 5171162,
          margin: 246825,
          name: "McKenzie-Waters",
          sector: "Retail",
        },
      });
    expect(res.statusCode).toEqual(200);
  });
  it("it should query for entrepries on year-ca-index", async () => {
    const res = await request(app).post("/ca_query").send({
      high: 100000,
      low: 0,
      year: 2017,
      Limit: 200,
      ScanIndexForward: false,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.Items).not.toBeUndefined();
    expect(res.body.Items).not.toBe(0);
  });
  it("it should get years of the same entreprise", async () => {
    const res = await request(app)
      .post("/compare_entreprise")
      .send({ name: "McKenzie-Waters" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.Items).not.toBeUndefined();
    expect(res.body.Items).not.toBe(0);
  });
});
