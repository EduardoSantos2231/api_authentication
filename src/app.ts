import express from "express";
import visitant_router from "./routes/visitant.route.js";

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(visitant_router)

app.listen(port, () => {
  console.log(`Running on http://localhost:${port} `);
});
