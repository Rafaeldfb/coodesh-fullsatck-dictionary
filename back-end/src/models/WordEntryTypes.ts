import { WordEntry } from '@prisma/client';

export type WordEntryStruct = Omit<WordEntry, "id">