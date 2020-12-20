# minesweeper-API

Backend API and frontend services to play Minesweeper.

### Where to play?
Here: https://lhoms-minesweeper-back.herokuapp.com

### Backend  
API developed in javascript using express.js framework.
Jest for testing.

Endpoints:
```
get board by id
GET  https://localhost:3001/board/:id

create new board 
POST https://localhost:3001/board/ 

new board with custom difficulty
POST https://localhost:3001/board/:difficulty

reveal cell in board
POST https://localhost:3001/board/:id/reveal/:x/:y  

flag cell in board 
POST https://localhost:3001/board/:id/flag/:x/:y

(Also can be acceded from https://lhoms-minesweeper-back.herokuapp.com/ instead of localhost) 
```   
  
For more details there is a swagger ui available to check endpoints details:  
`http://localhost:3001/api-docs`

How to use?

`npm install` To install dependencies.  
`npm run start` Will start API listening port 3001.  

`npm run test` To run test.  

### Frontend
Simple react app created to consume this api.  
In this app is possible to select difficulty and create a new game using the api.

With left-click you can reveal the board cells.
With right-click you can flag/un-flag the cells.

One you reveal a bomb the game is finished and you should start another. Is not possible to continue.
  
How to use?  
  
`npm install` To install dependencies.  
`npm run start` Will open localhost:3000/ in browser (if not, do it manually).   


### Important points
- It was designed only for desktop use, it is not responsive at all.
- For now it does not have persistence, only in memory. It's delegated in a repository.
- Heroku was really good to deploy it. It was fast and very good integrated. The only bad part is the latency, at least with a free dyno.


### Pending Features:
- Persistence
- Time Tracking
- Game history / resume
- Multiple user support
