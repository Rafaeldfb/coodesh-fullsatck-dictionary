import dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  server: {
    port: process.env.PORT || 3000, // Use PORT from .env or default to 3000
  },
};

export default nextConfig;
