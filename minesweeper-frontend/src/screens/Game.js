import React from 'react';
import RestClient from "../rest/RestClient";
import {Board} from '../Components/Board';
import { Time } from "../Components/Time";

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {rows: []};
  }

  componentDidMount() {
    const {difficulty, user} = this.props.match.params;
    const restClient = new RestClient();
    restClient.newGame(difficulty, user)
        .then(res => {
          this.setState({
            rows: res.data.rows,
            id: res.data.id,
            user: res.data.user,
            finished: res.data.finished,
            win: res.data.win,
            creationDate: res.data.creationDate,
            endDate: res.data.endDate});
        })
  }

  // board has changed
  handler() {
    const restClient = new RestClient();
    restClient.getGame(this.state.id, this.state.user)
        .then(res => {
          this.setState({
            rows: res.data.rows,
            id: res.data.id,
            user: res.data.user,
            finished: res.data.finished,
            win: res.data.win,
            creationDate: res.data.creationDate,
            endDate: res.data.endDate});
        })
  }

  render() {
    const {rows, id, user, finished, win, creationDate, endDate} = this.state;
    return (
        <div style={{display: 'flex', 'flex-direction': 'column', padding: '7%'}}>
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
