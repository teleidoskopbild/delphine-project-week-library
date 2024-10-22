import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import db from "./util/db-connect.js";

const PORT = process.env.PORT || 3000;
const app = express();
async function getRoot(req, res) {
  return res.json({ msg: "Hello World" });
}
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
