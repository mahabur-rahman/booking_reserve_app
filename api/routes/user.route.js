import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// verify ______________ demo example _____________________
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account!");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete all accounts!");
// });

// ______________ end demo example _____________________

// UPDATE
router.put("/:id", verifyUser, updateUser);
// DELETE
router.delete("/:id", verifyUser, deleteUser);
// GET SINGLE USER
router.get("/:id", verifyUser, getSingleUser);
// GET ALL USER || if (isAdmin : true) otherwise not work
router.get("/", verifyAdmin, getAllUsers);

export default router;
