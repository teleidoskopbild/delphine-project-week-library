import { Router } from "express";
import { getAllBooks } from "../controllers/books.js";

const router = Router();

router.get("/", getAllBooks);

export default router;
