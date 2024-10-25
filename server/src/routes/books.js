import { Router } from "express";
import { getAllBooks } from "../controllers/books.js";
import { returnBooks } from "../controllers/books.js";
import { availableQty } from "../controllers/books.js";
import { borrowBooks } from "../controllers/books.js";

const router = Router();

router.get("/", getAllBooks);
router.post("/return", returnBooks);
router.post("/borrow", borrowBooks);
router.get("/available_qty", availableQty);

export default router;
