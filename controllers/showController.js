import { showModal } from "../model/showModal.js";
import { userModel } from "../model/userModel.js";

const getBookedShows = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const user = await userModel
      .findById(loggedInUserId)
      .populate("booked_shows");
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    res.status(200).send({
      message: "Booked shows fetched Successfully",
      data: user.booked_shows,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await showModal.find();
    res.status(200).send({
      message: "Shows fetched Successfully",
      data: shows,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await showModal.findById(id);
    res.status(200).send({
      message: "Show fetched Successfully",
      data: show,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const bookTicket = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = req.user._id;
    const user = await userModel.findOneAndUpdate(
      { _id: user_id },
      { $addToSet: { booked_shows: id } },
      { new: true }
    );
    res.status(200).send({
      message: "Show fetched Successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const allBookedTickets = async (req, res) => {
  try {
    const usersWithTickets = await userModel
      .find({
        booked_shows: { $exists: true, $not: { $size: 0 } },
      })
      .populate("booked_shows");
    const totalUsersWithTickets = await userModel.countDocuments({
      booked_shows: { $exists: true, $not: { $size: 0 } },
    });
    res.status(200).send({
      success: true,
      message: "Fetched all booked tickets with user details",
      data: usersWithTickets,
      count: totalUsersWithTickets,
    });
  } catch (error) {
    console.error("Error fetching booked tickets:", error);
    res.status(500).send({ message: error.message, success: false });
  }
};

export {
  getAllShows,
  getBookedShows,
  getShowById,
  bookTicket,
  allBookedTickets,
};
