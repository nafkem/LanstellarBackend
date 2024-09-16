import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { COMMON_CONFIG } from '../config/common';
import { CONSTANTS } from '../config/constants';


const secretKey = COMMON_CONFIG.SECURITY_KEY.JwtSecret;

export const generateJwtToken = (userData: any) => {
  const payload = {
    // Include the user data in the payload
    userData,
    // Your other claims here (e.g., user ID, username, etc.)
    // ...
    exp: Math.floor(Date.now() / 1000) + (60 * 5), // Token will expire in 2 minutes from now
  };

  return jwt.sign(payload, secretKey);
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: CONSTANTS.MESSAGES.API_KEY_MISSING });
  }

  if (!authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: CONSTANTS.MESSAGES.INVALID });
  }

  const token = authHeader.substring('Bearer '.length);

  console.log(token)
  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token is expired
        return res.status(401).json({ error: CONSTANTS.MESSAGES.TOKEN_EXPIRED });
      } else {
        // Other JWT verification errors (e.g., invalid signature, invalid token)
        return res.status(403).json({ error: CONSTANTS.MESSAGES.FORBIDDEN });
      }
    }
if(!req.body.id)      return res.status(403).json({ error: CONSTANTS.MESSAGES.ERR_USER_NOT_FOUND });
    // Assuming user ID is stored as 'userId' in the userData object and the same in req.body
    if (req.body.id === user["userData"]) {
      next();
    } else {
      return res.status(403).json({ error: CONSTANTS.MESSAGES.FORBIDDEN });
    }




  });
};
