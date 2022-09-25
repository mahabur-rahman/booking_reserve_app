import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await UserModel({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json("User has been created!");
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "sorry, user not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password!"));

    //   generate jwt token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    // return res.status(200).json(user);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
