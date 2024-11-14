"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./src/data/db"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const missilesRoutes_1 = __importDefault(require("./src/routes/missilesRoutes"));
const socketServer_1 = require("./socketServer");
const http_1 = require("http");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
const io = (0, socketServer_1.initializeSocketServer)(httpServer);
(0, db_1.default)();
app.use('/api/', authRoutes_1.default);
app.use('/api/', missilesRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map