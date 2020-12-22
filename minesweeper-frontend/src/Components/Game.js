import React from 'react';
import RestClient from "../rest/RestClient";
import {Board} from './Board';
import { Time } from "./Time";

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {rows: []};
  }

  componentDidMount() {
    const {user, id, difficulty} = this.props.match.params;
    console.log(user, id, difficulty);
    const restClient = new RestClient();
    getOrCreateGame(user, id, difficulty, restClient)
        .then(res => this.setState({...res.data}))
  }

  // board has changed
  handler() {
    const restClient = new RestClient();
    restClient.getGame(this.state.id, this.state.user)
        .then(res => this.setState({...res.data}))
  }

  render() {
    const {rows, id, user, finished, win, creationDate, endDate} = this.state;
    return (
        <div style={{display: 'flex', 'flex-direction': 'column', padding: '7%'}}>
          <div style={{fontSize: '2vh'}}>
            User: {this.state.user}
          </div>
          <div style={{fontSize: '2vh'}}>
            Game status: {finished ? `Game Over! You ${win ? 'WIN! :D' : 'lose :('}` : `Running...`}
            <Time creationDate={creationDate} endDate={endDate}/>
          </div>
          <div>
            Game id: {id}
          </div>
          <Board action={this.handler} id={id} user={user} rows={rows}/>
        </div>
    );
  }
}

const getOrCreateGame = (user, id, difficulty, restClient) => id ? restClient.getGame(id, user) : restClient.newGame(difficulty, user);
