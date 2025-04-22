import express from "express";
const router = express.Router();
import { getAllShows, getBookedShows, getShowById,bookTicket } from "../controllers/showController.js";
import { authentication } from "../middleware/authMiddleware.js";

router.get("/", authentication, getAllShows);
router.put("/", authentication, bookTicket);
router.get("/booked-shows", authentication, getBookedShows);
router.get("/:id", authentication, getShowById);
export default router;
