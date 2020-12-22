# minesweeper-API

Backend API and frontend services to play Minesweeper.

### Where to play?
Here: https://lhoms-minesweeper-back.herokuapp.com

### Backend  
API developed in javascript using express.js framework.
Jest for testing.

Endpoints to handle game actions:
```
get board by id
GET  http://localhost:3001/game/:user/board/:id

create new board 
POST http://localhost:3001/game/:user/board/ 

get all user's boards 
GET http://localhost:3001/game/:user/board 

new board with custom difficulty
POST http://localhost:3001/game/:user/board/:difficulty

reveal cell in board
POST http://localhost:3001/game/:user/board/:id/reveal/:x/:y  

flag cell in board 
POST http://localhost:3001/game/:user/board/:id/flag/:x/:y

(Also can be accessed from https://lhoms-minesweeper-back.herokuapp.com/ instead of localhost:3001) 
```   
  
    
Simple user api
```
get all users  
GET  http://localhost:3001/user/user  
  
get user by id
GET http://localhost:3001/user/:id

create user
POST http://localhost:3001/user/:id
 ```

For more details there is a swagger ui available to check endpoints details:  
`http://localhost:3001/api-docs`  
`https://lhoms-minesweeper-back.herokuapp.com/api-docs`

How to use?

`npm install` To install dependencies.  
`npm run start` Will start API listening port 3001.  

`npm run test` To run test.  

### Frontend
Simple react app created to consume this api.  
In this app is possible to select difficulty and create a new game using the api.

#### How to play?  

You have to select difficulty then select an username or create a new one.  
Once you have selected difficulty and user, you can create a new game.  
With left-click you can reveal the board cells.  
With right-click you can flag/un-flag the cells.

You can resume a game selecting the game-row in history screen.   
You just only have to select the username and click on History button.     

Once you reveal a bomb the game is finished and you should start another. Is not possible to continue.

  
#### How to use?  
  
`npm install` To install dependencies.  
`npm run start` Will open localhost:3000/ in browser (if not, do it manually).   


### Important points
- The focus is on Backend so the Frontend was designed only for desktop use, it is not responsive at all.
- For now it does not have persistence, only in memory. It's delegated in a repository.
- Heroku was really good to deploy it. It was fast and very good integrated. The only bad part is the latency, at least with a free dyno.


### Pending Features:
- Persistence
