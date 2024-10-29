import { Router } from "express";
import { returnBooks } from "../controllers/books.js";
import { getAllBooks } from "../controllers/books.js";
import { borrowBooks } from "../controllers/books.js";

const router = Router();

router.get("/", getAllBooks);
router.post("/return", returnBooks);
router.post("/borrow", borrowBooks);

export default router;
