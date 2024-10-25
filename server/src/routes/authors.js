import express from "express";
import db from "../util/db-connect.js"; // Ensure db connection is correct

const router = express.Router();

// Get all authors
router.get("/", async (req, res) => {
  try {
    // Fetch all authors from the library_authors table
    const authors = await db("library_authors").select("*");
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
