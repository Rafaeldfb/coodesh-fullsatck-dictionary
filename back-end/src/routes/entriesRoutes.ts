import { Request, Response, NextFunction, Router } from 'express';
// import authMiddleware from '../middleware/auth';
// import { LoginController, LogoutController, RefreshSessionToken } from '../controllers/authController';
// import { CreateUserController } from '../controllers/userControllers';
// import { RequestJwt } from '../@types/express';
// import { AuthResponse } from '../@types/http';

const router = Router();

// Retornar a lista de palavras do dicionário, com paginação e suporte a busca. O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:
// [GET]/entries/en?search=fire&limit=4
router.get('/en', function(req: Request, res: Response) {
  res.send({ message: 'under develepment - ' + '/en'});
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