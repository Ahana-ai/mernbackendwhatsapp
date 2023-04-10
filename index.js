import express, { json } from "express";
import cors from "cors";
import Connections from "./database/db.js";
import dotenv from "dotenv";
import router from "./routes/route.js";

dotenv.config();

const PORT = 2000;

const app = express();

//To allow cross-origin requests -> occurs as backend runs in different port than the frontend
//can only be handled in backend
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json({ extended: true }));
//To use the router in the server
app.use("/", router);

Connections();

app.listen(PORT, () => {
  console.log(`Server is running at @ http://localhost:${PORT}`);
});
