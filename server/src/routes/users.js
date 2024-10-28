import { Router } from "express";
import { login } from "../controllers/users.js";
import { getUserBorrowedBooks } from "../controllers/users.js";

const router = Router();

router.post("/login", login);
router.get("/:user_id/borrowed_books", getUserBorrowedBooks);

export default router;
