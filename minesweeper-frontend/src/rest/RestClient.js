import axios from "axios";

//const URL = "http://localhost:3001";
const URL = "https://lhoms-minesweeper-back.herokuapp.com";
const gameUrl = (user, rest) => `${URL}/game/${user}/board${rest || ''}`;

export default class RestClient {

  // board
  newGame(difficulty, user) {
    return axios.post(gameUrl(user, `/${difficulty}`));
  }
  
  getGame(id, user) {
    return axios.get(gameUrl(user,`/${id}`));
  }
  
  revealMine(id, x, y, user) {
    return axios.post(gameUrl(user,`/${id}/reveal/${x}/${y}`));
  }

  flagMine(id, x, y, user) {
    return axios.post(gameUrl(user,`/${id}/flag/${x}/${y}`));
  }

  // user
  getUsers() {
    return axios.get(`${URL}/user`);
  }

  newUser(id) {
    return axios.post(`${URL}/user/${id}`);
  }
}
