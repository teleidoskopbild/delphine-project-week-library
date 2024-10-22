import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

const PORT = process.env.PORT || 4444;

const app = express();

app.use(cors());
app.use(json());

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});

app.get("/", async (_, res) => {
  return res.json({ msg: "Hello World-Library" });
});
