"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../models/Usuario");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get a list of all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Usuario_1.Usuario.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get a single user
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Usuario_1.Usuario.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}));
// Update a user
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Usuario_1.Usuario.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}));
// Delete a user
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Usuario_1.Usuario.findByIdAndDelete(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
