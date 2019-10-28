import { config } from "dotenv";
config();

const JWT_SECRET = process.env.JWT_SECRET || "thissecretshouldnothappen";

export { JWT_SECRET };
