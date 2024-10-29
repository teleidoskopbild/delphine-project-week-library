import db from "../util/db-connect.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await db("library_authors").select("*");
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export async function getBooksByAuthors(req, res) {
  try {
    const booksByAuthors = await db("library_authors")
      .leftJoin(
        "library_books",
        "library_authors.id",
        "library_books.fk_author"
      )
      .select(
        "library_authors.id AS authorId",
        "library_authors.name AS authorName",
        "library_books.title AS bookTitle"
      )
      .where("library_authors.id", req.params.authorId);

    if (booksByAuthors.length === 0) {
      return res
        .status(404)
        .json({ msg: "Keine Bücher für diesen Autor gefunden" });
    }

    return res.json({ booksByAuthors });
  } catch (err) {
    console.error("Fehler beim Abrufen der Bücher des Autors:", err);
    return res.status(500).json({ msg: "Interner Serverfehler" });
  }
}
