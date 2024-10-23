import { Router } from "express";
import { login } from "../controllers/users.js";

const router = Router();

router.post("/login", login);

export default router;
