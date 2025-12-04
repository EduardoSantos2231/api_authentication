import { Router } from "express";
import visitant from "../controllers/visitant.controller.js";
import seeRequisition from "../middlewares/seeReq.middleware.js";

import validateJwtToken from "../middlewares/validateToken.middleware.js";

const visitant_router = Router();


visitant_router.get("/", seeRequisition, visitant.getHomePage);
visitant_router.get("/login", seeRequisition, visitant.getLoginPage);
visitant_router.post("/sign", seeRequisition, visitant.postSignIn);
visitant_router.get("/inside", validateJwtToken, visitant.getInsideAplication);

export default visitant_router;
