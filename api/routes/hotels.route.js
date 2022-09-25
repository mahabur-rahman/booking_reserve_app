import express from "express";
const router = express.Router();

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET SINGLE
router.get("/find/:id", getSingleHotel);
// GET ALL
router.get("/", getAllHotels);
// COUNT BY CITY
router.get("/countByCity", countByCity);
// COUNT BY TYPE
router.get("/countByType", countByType);
// GET HOTEL ROOM
router.get("/room/:id", getHotelRooms);

export default router;
