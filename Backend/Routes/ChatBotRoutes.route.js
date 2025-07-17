import { Router } from "express";
import { botController } from "../controller/botController.controller.js";
const router = Router();

router.route("/chatRoute").post(botController);

export default router;