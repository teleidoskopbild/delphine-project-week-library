import db from "../util/db-connect.js";

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
export async function getAllBooks(req, res) {
  const { fk_book_id } = req.query;

  try {
    const totalBooks = await db("library_books as b")
      .select(
        "library_authors.name as authorName",
        "b.title",
        "b.quantity as total_quantity",
        "b.id",
        db.raw(
          "COALESCE(b.quantity - COUNT(bb.id), b.quantity) as available_quantity"
        )
      )
      .leftJoin("library_borrowed_books as bb", function () {
        this.on("b.id", "=", "bb.fk_book_id").andOnNull("bb.returned_at");
      })
      .join("library_authors", "b.fk_author", "=", "library_authors.id")

      .groupBy("b.id", "library_authors.name");
    console.log(totalBooks);
    if (!totalBooks) {
      return res.status(404).json({ message: "Book not found." });
    }

    // If we have a query parameter to get the available quantity for a book with given id, we just return this value as before 'avaiableQty'
    if (totalBooks) {
      // If we don't have a book id through query param but a result with all available quantities of the books, we return the full result
      // Attention: keep in mind to handle this result differently in client!
      return res.json(totalBooks);
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
