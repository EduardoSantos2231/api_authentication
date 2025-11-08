import { Router } from "express";
import visitant from "../controllers/visitant.controller.js";
import seeRequisition from "../middlewares/seeReq.middleware.js";
import session from "express-session";

const visitant_router = Router();



visitant_router.use(session({
  secret: "segredo_secreto123", 
  saveUninitialized: true,
  resave: false,
  cookie: { 
    maxAge: 3600*60,
    secure: false,
    httpOnly: true,
  }, 
}));

visitant_router.get("/", seeRequisition, visitant.getHomePage);
visitant_router.get("/login", seeRequisition, visitant.getLoginPage);

export default visitant_router;
