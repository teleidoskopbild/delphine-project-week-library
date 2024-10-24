import { Router } from "express";
import { getAllBooks } from "../controllers/books.js";
import { getReturnBooks } from "../controllers/books.js";

const router = Router();

router.get("/", getAllBooks);
router.post("/return", getReturnBooks);

export default router;
