This is a test app for Fabric.
Preview it here: [Tidybase.com](https://www.tidybase.com)
You can run it locally using the steps below:

## Install dependencies
`npm install`

## Set up environment variables
Create `.env` file in the root, similar to `.env.example`

## Create db tables
`npx prisma migrate dev --name init`

## Run locally
`npm run dev`