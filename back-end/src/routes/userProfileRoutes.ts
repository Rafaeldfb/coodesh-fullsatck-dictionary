import { Request, Response, Router } from "express";

const router = Router();

// Return the user profile.
router.get('/me', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/me'});
});

// Return the list of visited words.
router.get('/me/history', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/me/history'});
});

// Return the list of words marked as favorites.
router.get('/me/favorites', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/me/favorites'});
});


export default router;
