import UserModel from "../models/User.model.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);

    return res.status(200).json("User has been deleted..");
  } catch (err) {
    next(err);
  }
};

// GET SINGLE USER
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
