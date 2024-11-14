import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Organization} from '../models/organization';

dotenv.config();
const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password, organization, region } = req.body;

    console.log(req.body);

    if (!username || !password || !organization) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const userOrganization = region 
      ? await Organization.findOne({ name: `${organization} - ${region}` })
      : await Organization.findOne({ name: organization });

        console.log(userOrganization);

        const resources = userOrganization?.resources || [];

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            organization,
            region,
            resources
        });

        await newUser.save();
        console.log(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, organization: user.organization, region: user.region, resources: user.resources },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
