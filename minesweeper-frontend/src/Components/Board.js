import React from 'react';
import {Table, TableRow} from "@material-ui/core";
import {Cell} from "./CellButton";

export class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {rows, action, id} = this.props;
    return (
        <div style={tableStyle}>
          <Table>
            <tbody>
              {rows.map(row => {
                return <TableRow>
                  {row.map(cell => <td key={cell.x + cell.y}> <Cell id={id} action={action} cell={cell} /> </td>)}
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
  width: '50vw',
  'align-self': 'center'
};
