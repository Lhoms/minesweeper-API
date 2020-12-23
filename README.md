# minesweeper-API

Backend API and frontend services to play Minesweeper.

## Where to play?
Here: https://lhoms-minesweeper-back.herokuapp.com

## Backend  
- API developed in javascript using express.js framework.  
- Jest for testing.  
- Redis as database.
- Swagger to document endpoints.
- ESLint airbnb
  
  
#### Game actions API:
```
get board by id
GET  http://localhost:3001/game/:user/board/:id

create new board 
POST http://localhost:3001/game/:user/board

get all user's boards 
GET http://localhost:3001/game/:user/board 

reveal cell in board
POST http://localhost:3001/game/:user/board/:id/reveal/:x/:y  

flag cell in board 
POST http://localhost:3001/game/:user/board/:id/flag/:x/:y

(Also can be accessed from https://lhoms-minesweeper-back.herokuapp.com/ instead of localhost:3001) 
```   
  
    
#### User API
```
get all users  
GET  http://localhost:3001/user/user  
  
get user by id
GET http://localhost:3001/user/:id

create user
POST http://localhost:3001/user/:id

create user
DELETE http://localhost:3001/user/:id
 ```

For more details there is a swagger ui available to check endpoints details:  
`http://localhost:3001/api-docs`  
https://lhoms-minesweeper-back.herokuapp.com/api-docs

#### How to use?

`npm install` To install dependencies.  
`npm run start` Will start API listening port 3001.  

`npm run test` To run test.  

## Frontend
React app created to consume game api.  
In this app is possible to select difficulty and create a new game using the api.  
Also check game history, resume/view old games and create users.  

#### How to play?  

- Select difficulty 
- Select an username or create a new one.  
- Once you have selected difficulty and user you can create a new game.  
- With left click you can reveal the board cells.  
- With right click you can flag/un-flag the cells.
- To access to the game history you have to select username and click 'history' button.       
- You can resume a game selecting the game-row in history screen.   

Once you reveal a bomb or all the no mined cells the game is finished and you can start another. Is not possible to continue.

  
#### How to use?  
  
`npm install` To install dependencies.  
`npm run start` Will open localhost:3000/ in browser (if not, do it manually).   


### Important points
- The focus is on Backend so the Frontend was designed only for desktop use, it is not full responsive.
- Heroku was really good to deploy it. It was fast and very good integrated. The only bad part is the latency, at least with a free dyno.
- API can paginate 'all user boards' endpoint just sending pageSize and pageNumber as query param, but the frontend is paginating in memory because they are going to be a few rows.
- Custom games can be created but is not integrated with the frontend.
- User model is very simple, just an username used as id. But the api structure will support if this model grows.
- I selected Redis as database from Heroku addons. There is an HSET for the users and for the boards each user as an individual HSET with the key 'username:boards'. Is pretty fast and easy to use. 
- If in the future is going to be replaced or is needed to add another one will be simple because is delegated in a client file.
