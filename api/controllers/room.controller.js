import RoomModel from "../models/Room.model.js";
import HotelModel from "../models/Hotel.model.js";

// CREATE ROOM
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }

    return res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE ROOM
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE ROOM AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await RoomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    return res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    await RoomModel.findByIdAndDelete(req.params.id);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    return res.status(200).json("Room has been deleted...");
  } catch (err) {
    next(err);
  }
};

// GET SINGLE ROOM
export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);

    return res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// GET ALL ROOMS
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();

    return res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
