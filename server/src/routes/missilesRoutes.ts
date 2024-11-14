import express from 'express';
import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Missile } from '../models/Missile';
import  jwt  from 'jsonwebtoken';
import { resourceLimits } from 'worker_threads';
import { Organization } from '../models/organization';


const secret = process.env.JWT_SECRET || 'default_fallback_secret';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
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
    const decoded = jwt.verify(tokenValue, secret);

    if(typeof decoded !== 'object'){
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    
    if ( !decoded.id ) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    // מציאת המשתמש לפי מזהה
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log(user);
    


    // מציאת המועמד לפי מזהה
    const regionResourcesId = decoded.resourcesId;
    const resources = await Organization.findById(regionResourcesId);
    if (!resources) {
      res.status(404).json({ message: 'resources not found' });
      return;
    }
    res.status(404).json({regionResourcesId})
    await user.save();

    res.json({ message: 'Vote recorded successfully', resources });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record vote', error: "Failed to record vote" });
  }
  res.json("blabla");
});

export default router;