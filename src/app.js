import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config";
import router from "./routes/routes";
import { getHttpCode } from "./helpers/utils";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB()

app.use("/api/v1", router);

app.get("/", (_, res) =>
  res.status(200).json({
    message: "Getir Tech Challenge api",
  })
);

app.all("*", (_, res) =>
  res.status(404).json({
    code: getHttpCode(404),
    error: "Route not found",
    msg: "Route not found",
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
