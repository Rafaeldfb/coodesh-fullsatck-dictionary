# Fullstack Dictionary by Rafa

This Application is divided into two pieces, back-end and front-end folders, each one with a different service to be 
Installed and to be ran.


## BACK-END 
A Server Logic application built with TypeScript, Express.Js, MongoDB and Prisma ORM.

### Database and Models
This API uses the MongoDB database with Prisma ORM.
Add to the .env file your MongoDB configuration for `DATABASE_URL`;


### User password hashing
As you cansee at you `.env.example` file, for test and develop environments you can use a small value for hashing salt, 
(less is more performatic and insecure) but for production, please set it to a value  greater than 8.
See more at Bcryptjs documentation.

### running the servers instance
run `pnpm run dev` to start the development server, default port is 3001

## FRONT-END
A Client UI server built with TypeScript, Next.js and React.Js.