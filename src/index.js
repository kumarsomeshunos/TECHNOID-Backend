// All imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";

// Routers
import AdminRouter from "./routes/Admin/admin.js";
import UserRouter from "./routes/TS/User/user.js";
import TicketRouter from "./routes/TS/Ticket/ticket.js";

// Config
const app = express();
dotenv.config();
const environment = process.env.ENVIRONMENT;

const { config } = await import(`./../config.${environment}.js`);

const main = async () => {
  // Mongo Connection
  mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB");
      console.log(error);
    })

  // Middlewares
  app.use(morgan(config.morgan.loggingFormat));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


  // Routes
  // TS stands for Ticket System project (will create similar routes for other projects)
  app.use("/api/admin", AdminRouter);
  app.use("/api/TS/user", UserRouter);
  app.use("/api/TS/ticket", TicketRouter);

  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
  });
}

main().catch((error) => {
  console.log("Something went wrong in main");
  console.log(error);
})