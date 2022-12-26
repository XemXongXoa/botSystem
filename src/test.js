import { generate_JWT } from "./func/jwt.js";
import dotenv from "dotenv";
dotenv.config();
console.log(generate_JWT({ name: "test" }));