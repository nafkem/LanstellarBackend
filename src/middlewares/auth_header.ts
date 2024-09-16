import { COMMON_CONFIG } from "../config/common";
import { CONSTANTS } from "../config/constants";
import { Request, Response, NextFunction } from 'express';
// Middleware to protect routes
export const authenticateAPIKey = (req: Request, res: Response, next: any) => {
  const APIauthHeader = req.header('APIKey');

  if (!APIauthHeader) {
    return res.status(401).json({ error: CONSTANTS.MESSAGES.API_KEY_MISSING});
  }
    if (APIauthHeader!=COMMON_CONFIG.SECURITY_KEY.ApiKey) return res.status(401).json({ error: CONSTANTS.MESSAGES.FORBIDDEN});
    next();
  
  };