"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./modules/auth");
const user_1 = require("./handlers/user");
const app = (0, express_1.default)();
const customLogger = (message) => (req, res, next) => {
    console.log(`Hello from ${message}`);
    next();
};
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
    res.json({ message: "hello" });
});
app.use("/api", auth_1.protect, router_1.default);
app.post("/user", user_1.createNewUser);
app.post("/signin", user_1.signin);
app.use((err, req, res, next) => {
    if (err.type === "auth") {
        res.status(401).json({ message: "unauthorized" });
    }
    else if (err.type === "input") {
        res.status(400).json({ message: "invalid input" });
    }
    else {
        res.status(500).json({ message: "oops, thats on us" });
    }
});
exports.default = app;
