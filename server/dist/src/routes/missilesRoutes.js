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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const organization_1 = require("../models/organization");
const secret = process.env.JWT_SECRET || 'default_fallback_secret';
dotenv_1.default.config();
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Authorization token is missing' });
            return;
        }
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) {
            res.status(400).json({ message: 'Token is malformed' });
            return;
        }
        // פענוח הטוקן כדי לשלוף את מזהה המשתמש
        // צריך להחליף במפתח הסודי שלך
        const decoded = jsonwebtoken_1.default.verify(tokenValue, secret);
        if (typeof decoded !== 'object') {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        if (!decoded.id) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        // מציאת המשתמש לפי מזהה
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(user);
        // מציאת המועמד לפי מזהה
        const regionResourcesId = decoded.resourcesId;
        const resources = yield organization_1.Organization.findById(regionResourcesId);
        if (!resources) {
            res.status(404).json({ message: 'resources not found' });
            return;
        }
        res.status(404).json({ regionResourcesId });
        yield user.save();
        res.json({ message: 'Vote recorded successfully', resources });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to record vote', error: "Failed to record vote" });
    }
    res.json("blabla");
}));
exports.default = router;
//# sourceMappingURL=missilesRoutes.js.map