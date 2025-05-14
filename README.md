# Feedback Manager

This is a web application to enable you to fill out a feedback form and then have it rendered on the screen. In the future I am looking to have them saved to a MongoDB database so they can be persistent and this project may evolve in other ways too.

This is meant to be a chance to put Typescript concepts and processes into action and practice on a real project.

This is a monolithic web app repo (frontend and backend shares a package.json and config) with a frontend segment written primarily in Vue with Typescript and using vue-router clientside routing. It also has an Express backend written using Typescript.

# Running the project

Run 'npm run dev' as usual to start the dev environment.

Scripts in package.json are slightly different because of the structure of this app. Usually to run the client in your browser you would run 'npm run dev' which in turn would simple map to 'vite'. Since we have a client and a server side on this our scripts look slightly different. We still just run 'npm run dev' to spin up our app but this time it runs two sub-commands concurrently: 'dev:server' which maps to 'ts-node src/backend/server.ts' (basically the typescript equivalent of node server.js) and 'dev:client' which is, again, 'vite'.