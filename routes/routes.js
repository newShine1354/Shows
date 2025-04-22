import express from "express";
const router = express.Router();
import authRouter from "./authRoutes.js";
import showRouter from "./showRoutes.js";

router.use("/auth", authRouter);
router.use("/show", showRouter);
export default router;
