"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./loadEnvironment.js");
// index.ts o app.ts
require("./src/db/connection");
// cargar rutas
const Rutas_Usuario_1 = __importDefault(require("./src/routes/Rutas_Usuario"));
const Rutas_Estudiante_1 = __importDefault(require("./src/routes/Rutas_Estudiante"));
const Rutas_Tutor_1 = __importDefault(require("./src/routes/Rutas_Tutor"));
const Rutas_Director_1 = __importDefault(require("./src/routes/Rutas_Director"));
// Cargar usuarios
const PORT = process.env.PORT || 3600;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const app = (0, express_1.default)();
const corsOptions = {
    origin: CORS_ORIGIN,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Load the routes
app.use("/usuarios", Rutas_Usuario_1.default);
app.use("/estudiantes", Rutas_Estudiante_1.default);
app.use("/tutores", Rutas_Tutor_1.default);
app.use("/directores", Rutas_Director_1.default);
// Middleware para manejar errores 404 (Recurso no encontrado)
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
