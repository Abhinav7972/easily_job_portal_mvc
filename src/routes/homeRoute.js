import { Router } from "express";
import HomeController from "../controllers/home.controller.js";

const HomeRoute = Router();



export default HomeRoute.get('/',HomeController.Homepage);

