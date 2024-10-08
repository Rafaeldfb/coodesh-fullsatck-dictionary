import { Request, Response } from "express";
export async function getWordsListed(req: Request, res: Response): Promise<string[]> {

  return ['Hello', 'word'];
}