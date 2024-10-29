import { Router } from "express";
import { getAllAuthors } from "../controllers/authors.js";
import { getBooksByAuthors } from "../controllers/authors.js";

const router = Router();

router.get("/", getAllAuthors);
router.get("/:authorId/books", getBooksByAuthors);

export default router;
