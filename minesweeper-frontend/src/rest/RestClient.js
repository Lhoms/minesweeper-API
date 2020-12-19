import axios from "axios";

const URL = "http://localhost:3001/board";

export default class RestClient {
  newGame(height, width, mines) {
    return axios.post(URL, {height, width, mines});
  }
  
  getGame(id) {
    return axios.get(`${URL}/${id}`);
  }
  
  revealMine(id, x, y) {
    return axios.post(`${URL}/${id}/reveal/${x}/${y}`);
  }
  
  flagMine(id, x, y) {
    return axios.post(`${URL}/${id}/flag/${x}/${y}`);
  }
}
