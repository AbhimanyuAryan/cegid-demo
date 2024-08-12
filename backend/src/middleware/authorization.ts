import { Request, Response, NextFunction } from 'express';

// Middleware to check if the user is an admin
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Access the user object set by authenticateToken

  if (user.role !== 'admin') {
    return res.status(403).send('Forbidden'); // Only admins can proceed
  }
  
  next(); // Proceed to the next middleware or route handler
};
