// All imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// Config
const app = express();
dotenv.config({ path: "./.env" })
const environment = process.env.ENVIRONMENT;
const { config } = await import(`./config.${environment}.js`);

// Middlewares
app.use(morgan(config.morgan.loggingFormat));

app.get("/healthcheck", (req, res) => {
    res.status(200).json({status: "OK"});
})

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
})