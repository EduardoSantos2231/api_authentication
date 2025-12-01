import { Router } from "express";
import visitant from "../controllers/visitant.controller.js";
import seeRequisition from "../middlewares/seeReq.middleware.js";
import session from "express-session";
import validateJwtToken from "../middlewares/validateToken.middleware.js";

const visitant_router = Router();

visitant_router.use(
  session({
    secret: "segredo_secreto123",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 3600 * 60,
      secure: false,
      httpOnly: true,
    },
  }),
);

visitant_router.get("/", seeRequisition, visitant.getHomePage);
visitant_router.get("/login", seeRequisition, visitant.getLoginPage);
visitant_router.post("/signIn", seeRequisition, visitant.postSignIn);
visitant_router.get("/inside", validateJwtToken, visitant.getInsideAplication);

export default visitant_router;
