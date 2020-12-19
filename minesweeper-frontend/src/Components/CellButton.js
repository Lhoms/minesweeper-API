import React from 'react';
import {Button} from "@material-ui/core";
import RestClient from "../rest/RestClient";

export class Cell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {nearMines, hasMine, flagged, revealed, exploded} = this.props.cell;
    const {text, style} = generateTextAndStyle(nearMines, hasMine, flagged, revealed, exploded);
    return (
        <div>
          <Button onClick={() => actionsOnClick(this.props)} variant="contained" style={style}> {text} </Button>
        </div>
    );
  }
}

const actionsOnClick = ({action, id, cell}) => {
  const restClient = new RestClient();
  restClient.revealMine(id, cell.x, cell.y);
  action();
}

const generateTextAndStyle = (nearMines, hasMine, flagged, revealed, exploded) => {
  let text = '_';
  const style = {
    'color': 'black',
    'background-color': 'gray'
  };

  if (!revealed) {
    text = flagged ? '?' : '_';
  } else if (revealed && !hasMine) {
    text = nearMines || '_';
    style['background-color'] = 'darkgray';
  } else if (revealed && hasMine) {
    text = 'X';
    style['background-color'] = exploded ? 'red' : 'darkgray';
  }
  return {text, style}
};
