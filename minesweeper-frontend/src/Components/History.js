import React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import RestClient from "../rest/RestClient";

const columns = [
  {field: 'id', headerName: 'ID', width: 300},
  {field: 'created',
    headerName: 'Created',
    width: 250,
    valueGetter: ({row}) => `${new Date(row.creationDate).toDateString()} ${new Date(row.creationDate).toLocaleTimeString()}`
  },
  {field: 'ended',
    headerName: 'Ended',
    width: 250,
    valueGetter: ({row}) => row.finished ? `${new Date(row.endDate).toDateString()} ${new Date(row.endDate).toLocaleTimeString()}` : '-'
  },
  {field: 'board',
    headerName: 'Board',
    width: 200,
    valueGetter: ({row}) => `${row.height}x${row.width} ${row.mines} mines`
  },
  {field: 'status',
    headerName: 'Status',
    width: 150,
    valueGetter: ({row}) => row.finished ? 'Finished.' : 'In progress.'
  },
];

export class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rows: [], ...props};
  }

  componentDidMount() {
    const restClient = new RestClient();
    const { user } = this.props.match.params;
    restClient.getGames(user)
        .then(res => {
          this.setState({...this.state, rows: res.data});
        })
  }

  render() {
    return (
        <div style={tableStyle}>
          <DataGrid hideFooterSelectedRowCount={true}
                    rows={this.state.rows}
                    columns={columns}
                    pageSize={8}
                    onRowClick={({row}) => goToGame(this.state, row)}/>
        </div>
    );
  }
}

const goToGame = ({history}, {id, user}) => {
  const url = `/game/${user}/${id}`;
  history.push(url);
};

const tableStyle = {
  'height': '550px',
  'display': 'flex',
  'flex-direction': 'column',
  'padding': '7%'
};
