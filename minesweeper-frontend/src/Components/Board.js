import React from 'react';
import {Table, TableRow} from "@material-ui/core";
import {Cell} from "./CellButton";

export class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {rows, action, id, user} = this.props;
    return (
        <div style={tableStyle}>
          <Table>
            <tbody>
              {rows.map(row => {
                return <TableRow>
                  {row.map(cell => <td key={cell.x + cell.y}> <Cell id={id} user={user} action={action} cell={cell} /> </td>)}
                </TableRow>
              })
              }
            </tbody>
          </Table>
        </div>
    );
  }
}

const tableStyle = {
  //width: '10vw',
  'align-self': 'center'
};
