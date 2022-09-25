import express from "express";
const router = express.Router();
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  getAllRooms,
  updateRoomAvailability,
} from "../controllers/room.controller.js";

// CREATE
router.post("/:hotelId", verifyAdmin, createRoom);
// UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
// GET SINGLE
router.get("/:id", getSingleRoom);
// GET ALL ROOM
router.get("/", getAllRooms);

export default router;
