import prisma from '../config/prisma';
import { WordEntry } from '@prisma/client';
import { WordEntryStruct } from './WordEntryTypes';


export default class WordEntryModel {
  static async getWordEntryById(wordEntryId: string): Promise<WordEntryStruct> {
    try {
      const wordEntry = await prisma.wordEntry.findUnique({
        where: {id: wordEntryId}
      });

      if (wordEntry) return wordEntry;

      throw new Error("Word not found");

    } catch {
      throw new Error("Invalid word id");
    }
  }

  static async getWordEntryByWord(word: string): Promise<WordEntryStruct> {
    try {
      const wordEntry = await prisma.wordEntry.findUnique({
        where: {word: word}
      });

      if (wordEntry) return wordEntry;

      throw new Error("Word not found");

    } catch {
      throw new Error("Word not found");
    }
  }

  static async createWordEntry(data: Omit<WordEntry, "id">): Promise<WordEntry> {
    try {
      const newWordEntry = await prisma.wordEntry.create({
        data: { 
          ...data,
          entryData: JSON.stringify(data.entryData)
        }
      });
      
      return newWordEntry;

    } catch (error){
      throw new Error("Word entry not created");
    }
  }
}
