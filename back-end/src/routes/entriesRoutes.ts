import { NextFunction, Request, Response, Router } from 'express';
import { RequestJwt } from '../@types/express';
import authMiddleware from '../middleware/auth';
import { getWordsListed } from '../controllers/entriesController'
// import { LoginController, LogoutController, RefreshSessionToken } from '../controllers/authController';
// import { CreateUserController } from '../controllers/userControllers';
// import { AuthResponse } from '../@types/http';

const router = Router();

// Retornar a lista de palavras do dicionário, com paginação e suporte a busca. O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:
// [GET]/entries/en?search=fire&limit=4
router.get('/en', async (req: RequestJwt, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next)
}, async (req: Request, res: Response) => {
  try {
    const wordsListed = await getWordsListed(req, res);
    res.status(200).json(wordsListed);

  } catch (err) {
    console.error('/en words list error:', err);

    res.status(500).json({ message: "Under develepment" });
  }
});

// Return the information for the specified word and record the access history.
router.get('/en/:word', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/en/:word'});
});


// Save the word to the favorites list (returning data in the body is optional)
router.post('/en/:word/favorite', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/en/:word/favorite'});
});

// Remove the word from the favorites list (returning data in the body is optional)
router.delete('/en/:word/unfavorite', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/en/:word/unfavorite'});
});


export default router;