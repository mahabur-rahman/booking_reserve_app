import { createError } from "../utils/error.js";
import HotelModel from "../models/Hotel.model.js";
import RoomModel from "../models/Room.model.js";

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();

    return res.status(201).json(savedHotel);
  } catch (err) {
    // return res.status(500).json(err);
    next(err);
  }
};

// UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedHotel);
  } catch (err) {
    // return res.status(500).json(err);
    next(err);
  }
};

// DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hotel has been deleted...");
  } catch (err) {
    // return res.status(500).json(err);
    next(err);
  }
};

// GET SINGLE HOTEL
export const getSingleHotel = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);

    return res.status(200).json(hotel);
  } catch (err) {
    // return res.status(500).json(err);
    next(err);
  }
};

// GET ALL
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const hotels = await HotelModel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);

    return res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT BY CITY
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  // console.log(cities);   -----> ['london', 'madrid', 'barlin']
  // console.log(cities);
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city: city });
      })
    );

    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT BY TYPE
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: "hotel" });

    const apartMentCount = await HotelModel.countDocuments({
      type: "apartment",
    });

    const resortCount = await HotelModel.countDocuments({ type: "resort" });

    const villaCount = await HotelModel.countDocuments({ type: "villa" });

    const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

    return res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartMentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// GET HOTEL ROOM
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return RoomModel.findById(room);
      })
    );

    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
