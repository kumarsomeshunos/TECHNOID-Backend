import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const config = {
  port: process.env.PORT_PROD,
  morgan: {
    loggingFormat: "combined",
  },
  mongo: {
    uri: process.env.MONGO_URI_PROD,
  },
};
