import db from "../util/db-connect.js";

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const notes = await db("library_books");
    return res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Book return
export async function getReturnBooks(req, res) {
  try {
    const retunBooks = await db("library_books")
      .first()
      .where({ bookID: Number(req.params.id) })
      .update({ returnBook: req.body.returned_at })
      .returning("*");
    if (retunBooks.length < 1) {
      return res.status(404).json({ msg: "Book not found" });
    }
    return res.json({ msg: "update successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error" });
  }
}
