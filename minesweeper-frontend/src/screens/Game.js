import React from 'react';
import RestClient from "../rest/RestClient";
import {Board} from '../Components/Board';

export class Game extends React.Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {rows: []};
  }

  componentDidMount() {
    const restClient = new RestClient();
    restClient.newGame()
        .then(res => {
          this.setState({rows: res.data.rows, id: res.data.id, finished: res.data.finished});
        })
  }

  // board has changed
  handler() {
    const restClient = new RestClient();
    restClient.getGame(this.state.id)
        .then(res => {
          this.setState({rows: res.data.rows, id: res.data.id, finished: res.data.finished});
        })
  }

  render() {
    const {rows, id, finished} = this.state;
    return (
        <div style={{display: 'flex', 'flex-direction': 'column'}}>
          <div>
            id: {id}
          </div>
          <div>
            juego: {finished ? "Juego finalizado" : "Juego en curso"}
          </div>
          <Board action={this.handler} id={id} rows={rows}/>
        </div>
    );
  }
}
