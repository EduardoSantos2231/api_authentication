import { Router } from "express";
import visitant from "../controllers/visitant.controller.js";
import seeRequisition from "../middlewares/seeReq.middleware.js";

const visitant_router = Router()


visitant_router.get("/", seeRequisition, visitant.getHomePage)

export default visitant_router