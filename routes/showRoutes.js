import express from "express";
const router = express.Router();
import {
  getAllShows,
  getBookedShows,
  getShowById,
  bookTicket,
  allBookedTickets,
} from "../controllers/showController.js";
import { authentication, authorization } from "../middleware/authMiddleware.js";

router.get("/all-booked", authentication, allBookedTickets);
router.get("/booked-shows", authentication, getBookedShows);
router.get("/", authentication, getAllShows);
router.put("/", authentication, bookTicket);
router.get("/:id", authentication, authorization, getShowById);
export default router;
