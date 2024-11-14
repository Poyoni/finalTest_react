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
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const organization_1 = require("../models/organization");
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, organization, region } = req.body;
    console.log(req.body);
    if (!username || !password || !organization) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        const userOrganization = region
            ? yield organization_1.Organization.findOne({ name: `${organization} - ${region}` })
            : yield organization_1.Organization.findOne({ name: organization });
        console.log(userOrganization);
        const resources = (userOrganization === null || userOrganization === void 0 ? void 0 : userOrganization.resources) || [];
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            username,
            password: hashedPassword,
            organization,
            region,
            resources
        });
        yield newUser.save();
        console.log(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, organization: user.organization, region: user.region, resources: user.resources }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map