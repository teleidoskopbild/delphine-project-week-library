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
  const borrowDate = new Date().toISOString();
  try {
    // Check if it is allowed to borrow the book
    // SELECT fk_book_id FROM library_borrowed_books WHERE fk_book_id={bookId} AND returned_at IS NULL

    if (!req.body.userId) {
      return res.status(404).json({ message: "user not found" });
    }

    const book = await db("library_books")
      .where({ id: req.body.bookId })
      .first();

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const borrowedCopies = await db("library_borrowed_books")
      .where({
        fk_book_id: req.body.bookId,
      })
      .whereNull("returned_at");

    if (
      borrowedCopies.find(
        (transaction) => transaction.fk_user_id == req.body.userId
      )
    ) {
      return res
        .status(400)
        .json({ message: "You already borrowed this book" });
    }

    const availableCopies = book.quantity - borrowedCopies.length;
    if (availableCopies < 1) {
      return res.status(400).json({ message: "No copies left" });
    }

    await db("library_borrowed_books").insert({
      fk_book_id: req.body.bookId,
      fk_user_id: req.body.userId,
      borrowed_at: borrowDate,
    });

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
  const returnDate = new Date();
  try {
    const retunBooks = await db("library_borrowed_books")
      .first()
      .where({ fk_book_id: req.body.bookId, fk_user_id: req.body.userId })
      .update({ returned_at: returnDate })
      .returning("*");
    if (retunBooks.length < 1) {
      return res.status(404).json({ msg: "Book not found" });
    }
    return res.json({ retunBooks });
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
