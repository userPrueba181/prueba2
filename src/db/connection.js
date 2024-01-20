"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbName = "tutorias_db";
const connectionString = process.env.ATLAS_URI || "";
mongoose_1.default
    .connect(connectionString, {})
    .then((req) => console.log("Database connected!"))
    .catch((err) => {
    console.log(err);
    console.log("No funciono la coneccion a la db");
});
