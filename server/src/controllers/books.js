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
 * @api POST /books/borrow, borrow book(update borrowed_at)
 *
 * @sampleRequest
 * {
 *  "bookId": 1,
 *  "userId":1,
 *  "date":"2020-01-01"
 * }
 */
export async function borrowBooks(req, res) {
  try {
    const borrowBooks = await db("library_borrowed_books")
      .first()
      .where({ fk_book_id: req.body.bookId, fk_user_id: req.body.userId })
      .update({ borrowed_at: req.body.date })
      .returning("*");
    if (borrowBooks.length < 1) {
      return res.status(404).json({ msg: "Book not found" });
    }
    return res.json({ msg: "update successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "error" });
  }
}
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
/**
 * @api GET /books/available_qty?fk_book_id=1 - Available Quantity a Book
 */
export async function availableQty(req, res) {
  const { fk_book_id } = req.query;

  try {
    const totalBooks = await db("library_books")
      .where({ id: fk_book_id })
      .first();
    if (!totalBooks) {
      return res.status(404).json({ message: "Book not found." });
    }
    const countResult = await db("library_borrowed_books")
      .where({ fk_book_id: fk_book_id })
      .whereNull("returned_at")
      .count("id as count");
    const borrowedCount = countResult.length > 0 ? countResult[0].count : 0;
    const availableQty = totalBooks.quantity - borrowedCount;
    if (availableQty >= 0) {
      return res.json({ availableQty });
    } else {
      return res
        .status(404)
        .json({ message: "No available copies for this book." });
    }
  } catch (error) {
    console.error("Error fetching available quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
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
