import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const config = {
    port: process.env.PORT_DEV,
    morgan: {
        loggingFormat: "dev"
    }
};