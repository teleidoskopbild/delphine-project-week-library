import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.get("/", async (_, res) => {
  return res.json({ msg: "Hello World, this seems to work" });
});

app.listen(PORT, () => {
  console.log("api is apparently running on port " + PORT);
});
