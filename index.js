import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import BusinessRoute from "./routes/BusinessRoute.js";
import db from "./config/Database.js";
import Businesses from "./models/BusinessModel.js";
import BusinessLocations from "./models/BusinessLocationModel.js";
import BusinessCoordinates from "./models/BusinessCoordinateModel.js";
import BusinessCategories from "./models/BusinessCategoryModel.js";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

// (async () => {
//   await db.sync();
//   await Businesses.sync();
//   await BusinessCoordinates.sync();
//   await BusinessCategories.sync();
//   await BusinessLocations.sync();
// })();

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(BusinessRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
