import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// ALL ROUTES
import authRoute from "./routes/auth.route.js";
import hotelRoute from "./routes/hotels.route.js";
import userRoute from "./routes/user.route.js";
import roomRoute from "./routes/room.route.js";

const app = express();
dotenv.config();

// connected to db
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongoDB`);
  } catch (err) {
    throw err;
  }
};

// if disconnect
mongoose.connection.on("disconnected", () => {
  console.log(`mongoDB disconnected`);
});

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);

// error handler middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errMessage = err.message || "something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errMessage,
    stack: err.stack,
  });
});

// listen app
app.listen(8080, () => {
  connect();
  console.log(`server is running at port : 8080`);
});
