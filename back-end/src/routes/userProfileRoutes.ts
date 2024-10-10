import { NextFunction, Request, Response, Router } from "express";
import { RequestJwt } from "../@types/express";
import authMiddleware from "../middleware/auth";
import { PublicUser } from "../models/UserTypes";
import { authUserController } from "../controllers/authController";

const router = Router();

// Returns the User profile.
// Also athenticates a token as valid User
router.get('/me', 
  (req: RequestJwt, res: Response, next: NextFunction) => {
    authMiddleware(req, res, next)
  },
  async (req: RequestJwt, res: Response) => {
    try {
      const authenticateUser = await authUserController(req, res);      
      res.status(200).json({ user: authenticateUser });

    } catch (error) {
      res.status(401).send({ message: 'Unauthorized' })
    }
  }
);

// Return the list of visited words.
router.get('/me/history', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/me/history'});
});

// Return the list of words marked as favorites.
router.get('/me/favorites', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/me/favorites'});
});


export default router;
