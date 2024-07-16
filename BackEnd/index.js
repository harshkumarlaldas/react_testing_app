const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
app.use(cors());
app.use(bodyParser.json())

const port = 3001;

const mongodbClient = require("mongodb").MongoClient;
const {ObjectId} = require("mongodb")
const conn = "mongodb://localhost:27017";
const client = new mongodbClient(conn);

const run = async () => {
  let conn1;
  let db;
  try {
    conn1 = await client.connect();
    db = conn1.db("list");
    await db.collection("todos").deleteMany();
    await db.collection("todos").insertMany([
      { status: true, desc: "Writing code" },
      { status: true, desc: "testin code" },
      { status: false, desc: "deploy code" },
    ]);
  } catch (e) {
    console.log(e);
  }
  app.get("/todos", async (req, res) => {
    const x = await db.collection("todos").find().toArray();
    res.json(x);
  });

  app.post("/todos", async (req, res) => {
    const x = await db.collection("todos").insertOne(req.body)
    res.json(x);
  });

  app.delete("/todos/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const x = await db.collection("todos").deleteOne(query);
    res.json(x);
  });

  app.put("/todos/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const x = await db.collection("todos").replaceOne(query, req.body);
    res.json(x);
  });
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Test harsh");
});

app.listen(port, () => {
  console.log("port is ready");
});
