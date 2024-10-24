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
/**
 * @api POST /books/return Return a Book(update returned_at )
 *
 * @sampleRequest
 * {
 *  "bookId": 1,
 *  "userId":1,
 *  "date":"2020-01-01"
 * }
 */
export async function returnBooks(req, res) {
  try {
    const retunBooks = await db("library_borrowed_books")
      .first()
      .where({ fk_book_id: req.body.bookId, fk_user_id: req.body.userId })
      .update({ returned_at: req.body.date })
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
// Controller function to get borrowed books for a specific user
export const getUserBorrowedBooks = async (req, res) => {
  const { user_id } = req.params; // Extract the user_id from request params

  try {
    // Query to get borrowed books for the user
    const borrowedBooks = await db("library_borrowed_books")
      .join(
        "library_books",
        "library_borrowed_books.fk_book_id",
        "=",
        "library_books.id"
      )
      .join(
        "library_authors",
        "library_books.fk_author",
        "=",
        "library_authors.id"
      )
      .select(
        "library_books.id",
        "library_books.title",
        "library_books.quantity",
        "library_authors.name as author",
        "library_borrowed_books.borrowed_at",
        "library_borrowed_books.returned_at"
      )
      .where({ fk_user_id: user_id });

    if (borrowedBooks.length === 0) {
      return res
        .status(404)
        .json({ message: "No borrowed books found for this user." });
    }

    // Return the list of borrowed books
    res.json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
