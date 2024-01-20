"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = exports.Director = exports.Estudiante = exports.Usuario = void 0;
// User.ts
const mongoose_1 = __importStar(require("mongoose"));
const express = require("express");
const path = __importStar(require("path"));
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
const { ObjectId } = mongoose_1.Schema.Types;
const options = { discriminatorKey: "kind" };
const userSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._%+-]+@unsaac\.edu\.pe$/,
        required: true,
        unique: true, // Esto asegura que el email sea único
    },
    password: {
        type: String,
        default: "passwordTemporal",
        required: true,
        maxLength: 20,
        minLength: 8,
    },
    foto: {
        type: String,
        default: "./uploads/Profile_Pictures/Profile_default_photo.jpg",
        required: true,
    },
    estado: {
        type: String,
        enum: ["Activo", "Desactivado", "Suspendido"],
        default: "Desactivado",
    },
});
const Usuario = mongoose_1.default.model("Usuario", userSchema);
exports.Usuario = Usuario;
// Crear un modelo de estudiante
const Estudiante = Usuario.discriminator("Estudiante", new mongoose_1.default.Schema({
    codigo: {
        type: String,
        match: /^[0-9]{6}$/,
        required: true,
        unique: true,
    },
    escuela: {
        type: String,
        maxLength: 50,
        default: "Ingeniería Informática y de Sistemas",
        required: true,
    },
    tutorias: [
        {
            type: ObjectId,
            ref: "Tutoria",
        },
    ],
}, options));
exports.Estudiante = Estudiante;
// Crear un modelo de Tutor (profesor)
const Tutor = Usuario.discriminator("Tutor", new mongoose_1.default.Schema({
    codigo: {
        type: String,
        match: /^[0-9]{6}$/,
        required: true,
        unique: true,
    },
    escuela: {
        type: String,
        maxLength: 50,
        required: true,
        default: "Ingeniería Informática y de Sistemas",
    },
    tutorias: [
        {
            type: ObjectId,
            ref: "Tutoria",
        },
    ],
}, options));
exports.Tutor = Tutor;
// Crear un modelo de director (administrador)
const Director = Usuario.discriminator("Director", new mongoose_1.default.Schema({
    codigo: {
        type: String,
        match: /^[0-9]{6}$/,
        required: true,
        unique: true,
    },
    escuela: {
        type: String,
        maxLength: 50,
    },
}, options));
exports.Director = Director;
