import React from 'react';
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RestClient from "../rest/RestClient";

export class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {difficulty: 'easy', users: []};
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    const restClient = new RestClient();
    restClient.getUsers()
        .then(res => {
          this.setState({users: res.data});
        })
  }

  // navBar has changed
  handler() {
    const restClient = new RestClient();
    restClient.getUsers()
        .then(res => {
          this.setState({users: res.data});
        })
  }

  render() {
    return (
        <div style={styles.navBar}>

          <FormControl component="fieldset">
            <FormLabel component="legend">Select difficulty:</FormLabel>
            <RadioGroup aria-label="difficulty" name="difficulty"
                        value={this.state.difficulty}
                        onChange={(e) => this.setState({...this.state, difficulty: e.target.value})}>
              <FormControlLabel value="easy" control={<Radio/>} label="EASY 8x8"/>
              <FormControlLabel value="medium" control={<Radio/>} label="MEDIUM 16x16"/>
              <FormControlLabel value="hard" control={<Radio/>} label="HARD 16x25"/>
              <FormControlLabel value="custom" disabled control={<Radio/>} label="CUSTOM"/>
            </RadioGroup>
          </FormControl>

          <FormControl style={{minWidth: '10vh'}}>
            <InputLabel id="demo-simple-select-label">Username</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.user}
                onChange={(e) => this.setState({...this.state, user: e.target.value})}>
              {this.state.users.map( u => <MenuItem id={u.id} value={u.id}> {u.id} </MenuItem>)}
            </Select>
          </FormControl>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField label="new username"
                       value={this.state.newUsername}
                       onChange={(e) => this.setState({...this.state, newUsername: e.target.value})}/>
            <Button
                variant="contained"
                size="large"
                style={{backgroundColor: "#FFBF46"}}
                disabled={this.state.newUsername === undefined || this.state.newUsername === ''}
                onClick={() => newUser(this.state.newUsername, this.handler)}
            >
              New User
            </Button>
          </div>

          <Button
              href={url(this.state)}
              variant="contained"
              size="large"
              style={{backgroundColor: "#FFBF46"}}
              disabled={this.state.user === undefined || this.state.user === ''}
          >
            New Game
          </Button>

          <Button
              href="/"
              variant="contained"
              size="large"
              style={{backgroundColor: "#FFBF46"}}
              disabled={this.state.user === undefined || this.state.user === ''}
          >
            History
          </Button>
        </div>
    );
  }
}

const url = ({difficulty, user}) => `/game/${user}/${difficulty}`;

const newUser = (id, change) => {
  const restClient = new RestClient();
  restClient.newUser(id).then(change);
};

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    maxHeight: "10vh",
  }
};
