import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

// roomNumbers : [
//     {number: 101, unavailableDates : [1.2.2022, 10.2.2022]}
//     {number: 102, unavailableDates : [4.2.2022, 21.2.2022]}
//     {number: 103, unavailableDates : [5.2.2022, 22.2.2022]}
//     {number: 104, unavailableDates : [6.2.2022, 7.2.2022]}
// ]

export default mongoose.model("Room", RoomSchema);
