import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config()

const numSaltRounds = Number(process.env.NUM_SALT_ROUNDS)

async function hash(str: string): Promise<string> {
  return bcryptjs.hash(str, numSaltRounds);
};

function compare(sample: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(sample, hash);
}

const bcryptAsync = {
  hash,
  compare
}

export default bcryptAsync;