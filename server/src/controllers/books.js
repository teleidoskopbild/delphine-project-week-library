import db from "../util/db-connect.js";

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await db("library_books");
    return res.json(books);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
