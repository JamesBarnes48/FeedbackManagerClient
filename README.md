# Feedback Manager

This is a web application to enable you to fill out a feedback form and then have it rendered on the screen. In the future I am looking to have them saved to a MongoDB database so they can be persistent and this project may evolve in other ways too.

This is meant to be a chance to put Typescript concepts and processes into action and practice on a real project.

This is the frontend of this project, written primarily in Vue with Typescript and using vue-router clientside routing. This is for most regular functions of the app. This frontend uses Vite as a development server so that handles compilation, serving up files and config.

It also has an Express backend written using Typescript in a seperate repo here: https://github.com/JamesBarnes48/FeedbackManagerServer

# Running the project
Can be run in dev using 'npm run dev' which maps to 'vite'. Vite allows you to build the 'dist' folder for eventually deploying to production