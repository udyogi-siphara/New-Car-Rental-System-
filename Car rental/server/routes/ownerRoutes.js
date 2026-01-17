import express from "express";
import {protect} from "../middleware/auth.js"
import { addCar, changeRoleToOWner, deleteCar, getOwnerCars, toggleCarAvailability } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOWner)
ownerRouter.post("/add-car", upload.single("image"), protect, addCar)
ownerRouter.get("/cars", protect, getOwnerCars)
ownerRouter.post("/toggle-car", protect, toggleCarAvailability)
ownerRouter.post("/delete-car", protect, deleteCar)

export default ownerRouter;