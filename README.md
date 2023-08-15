This is a test app for Fabric.
You can run it locally using the steps below or preview it on [Tidybase.com](https://www.tidybase.com).

## Install dependencies
`npm install`

## Set up environment variables
Create `.env` file in the root, similar to `.env.example`

## Create db tables
`npx prisma migrate dev --name init`

## Run locally
`npm run dev`