import WordsListModel from '../models/WordList';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { WordsList } from '@prisma/client';

dotenv.config();

// Should run at first request with zero words saved in DB
export default async function startWordsListService(): Promise<boolean> {
  let successfullyStarted = false;

  const wordsAccount = await WordsListModel.allWordsList()
    .then(list => list?.length)
    .catch(err => {
      throw new Error(err.message);
    });

  if (!wordsAccount) {
    const urlWordsList = process.env.FREE_DICTIONARY_FULL_LIST_URL as string;

    await fetch(urlWordsList)
      .then(async (resp) => {
        if (!resp.ok || !resp.body) {
          throw new Error('Words list update not successful');
        };

        successfullyStarted = await writeFileWordlist(resp);

        if (!successfullyStarted) {
          throw new Error('Words list update not successful');
        }
        
        successfullyStarted = await loadWordlistFile();
      })
      .catch(error => {
        console.error('Error Downloading file:', error);
        throw new Error('WordList.txt file not downloaded.');
      });
  }

  return successfullyStarted;
}

async function writeFileWordlist(fetchresponse: Response): Promise<boolean> {
  if (!fetchresponse.body) {
    throw new Error('Response body is emprty.');
  }
  
  let successfullyWrote = false;
  const filePath = path.join(__dirname, 'public', 'wordslist.txt');

  const fileStream = fs.createWriteStream(filePath, 'utf8');
  const reader = fetchresponse.body.getReader();

  // Function to read and write to the file
  const pump = async () => {
    try {
      const { done, value } = await reader.read();
      if (done) {
        fileStream.end(); // Close the file stream when done
        successfullyWrote = true; // Mark as successfully wrote
        return;
      };

      fileStream.write(Buffer.from(value)); // Write buffer to file
      await pump(); // Recursively call to continue reading

    } catch (error) {
      console.error('Error during the pumping process:', error);
      throw new Error('Failed to write to the file.'); // Propagate the error
    }
  };

  try {
    await pump(); // Start the pumping process
  } catch (error) {
    console.error('Error in writeFileWordlist:', error);
    successfullyWrote = false; // Ensure it reflects the error state
  }

  return successfullyWrote;
}

async function loadWordlistFile() : Promise<boolean>{
  const filePath = path.join(__dirname, 'public', 'wordslist.txt');
  let content: string = '';

  await fs.promises.readFile(filePath, { encoding: 'utf8'})
  .then((data) => content = data)
  .catch(error => {
      console.error(error);
      throw new Error("Not possible to load wordlist file.")
    }
  );

  if (!content?.length) { 
    throw new Error("Not possible to read wordlist content.")
  }

  const wordsList: string[] = content.split('\n');
  if (!wordsList?.length) {
    throw new Error("Not possible to create wordlist's array")
  };

  const wordsListObject = wordsList.map(word => {
    return { word }
  }) as Pick<WordsList, 'word'>[];

  const dbTransferWordsList = await WordsListModel.createWordsList(wordsListObject);

  // true for numbers gt 0, otherwise false.
  return !!dbTransferWordsList
}