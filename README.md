to run this project I am using node and Angular 9. Please make sure to download the relevant dependancies.

run `npm i` to download the local dependancies
also please install json-server glabally using 

`npm i -g json-server`

Once you have all the depancies please run npm start. I had to use a proxy for the fake BE server which you'll see in the code.

on a separate terminal please run 

`json-server --watch  highscores.json` to start the fake server

Going forward I will remove the prompt at the end and use the router to show either a game over page or congradulations page

I also want to have a start page so the user doesn't jump straight into the game

And really I need to move all the items to do with the server from my numbers service to its own section for proper BE integration.
