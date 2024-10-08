import prisma from "../config/prisma";
import { WordsList } from "@prisma/client";

export default class WordListModel {
  static async getWordByID(wordId: string): Promise<WordsList> {
    try {
      const word = await prisma.wordsList.findUnique({
        where: {id: wordId}
      });

      if (word) return word;

      throw new Error("Word not found");

    } catch {
      throw new Error("Invalid word id");
    }
  }

  static async getWordByWord(word: string): Promise<WordsList> {
    try {
      const wordQuery = await prisma.wordsList.findUnique({
        where: {word: word}
      });

      if (wordQuery) return wordQuery;

      throw new Error("Word not found");

    } catch {
      throw new Error("Word not found");
    }
  }

  static async allWordsList(): Promise<WordsList[]> {
    try {
      const allWordsList = await prisma.wordsList.findMany();

      if (allWordsList) return allWordsList;

      throw new Error("Empty list");

    } catch {
      throw new Error("Words List not found");
    }
  }

  static async createWordsList(wordsList: Pick<WordsList, 'word'>[]): Promise<number> {
    try {
      const newWordsList = await prisma.wordsList.createMany({
        data:  wordsList
      });
      
      return newWordsList?.count ?? 0;

    } catch (error){
      throw new Error("Word list not created");
    }
  }
}