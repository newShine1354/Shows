import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Please login first.", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .send({ message: "Unauthorized - Invalid token", success: false });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error?.message || "", success: false });
  }
};

const authorization = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .send({ message: "Permission denied", success: false });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error?.message || "", success: false });
  }
};

export { authentication, authorization };
