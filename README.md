# Feedback Manager

This is a web application to enable you to fill out a feedback form and then have it rendered on the screen. In the future I am looking to have them saved to a MongoDB database so they can be persistent and this project may evolve in other ways too.

This is meant to be a chance to put Typescript concepts and processes into action and practice on a real project.

This is the frontend of this project, written primarily in Vue with Typescript and using vue-router clientside routing. This is for most regular functions of the app. This frontend uses Vite as a development server so that handles compilation, serving up files and config.

It also has an Express backend written using Typescript in a seperate repo here: https://github.com/JamesBarnes48/FeedbackManagerServer

# Setting up your Environment

First of all you'll need to run 'npm i' as always to install packages.

Setup of this project is much simpler than the server but it does require the backend to be up and running to work. Set that up and make sure its running in the background so our api requests can reach it. Also in api.ts ensure your baseURL is set to where your backend is running on. In my case its localhost:3000. With this up and running this clientside can manage itself.

# Running the project
Can be run in dev using 'npm run dev' which maps to 'vite'. Vite allows you to build the 'dist' folder for eventually deploying to production