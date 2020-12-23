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
          <Button variant="contained"
                  onClick={() => actionsOnClick(this.props)} 
                  onContextMenu={(e) => actionsOnRightClick(this.props, e)}
                  style={style}> {text} </Button>
        </div>
    );
  }
}

const actionsOnClick = async ({action, id, cell, user}) => {
  const restClient = new RestClient();
  await restClient.revealMine(id, cell.x, cell.y, user);
  action();
};

const actionsOnRightClick = async ({action, id, cell, user}, e) => {
  e.preventDefault();
  const restClient = new RestClient();
  await restClient.flagMine(id, cell.x, cell.y, user);
  action();
};

const generateTextAndStyle = (nearMines, hasMine, flagged, revealed, exploded) => {
  let text = '_';
  const style = {
    width: '30%',
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
