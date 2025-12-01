import express from "express";
import visitant_router from "./routes/visitant.route.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

dotenv.config()

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(visitant_router);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port} `);
});
