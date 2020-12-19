import React from 'react';
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {difficulty: 'easy'};
  }

  render() {
    return (
        <div style={styles.navBar}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select difficulty:</FormLabel>
            <RadioGroup aria-label="difficulty" name="difficulty"
                        value={this.state.difficulty}
                        onChange={(e) => this.setState({difficulty: e.target.value})}>
              <FormControlLabel value="easy" control={<Radio />} label="EASY 8x8" />
              <FormControlLabel value="medium" control={<Radio />} label="MEDIUM 16x16" />
              <FormControlLabel value="hard" control={<Radio />} label="HARD 16x25" />
              <FormControlLabel value="custom" disabled control={<Radio />} label="CUSTOM" />
            </RadioGroup>
          </FormControl>

          <Button
              href={url(this)}
              variant="contained"
              size="large"
              style={{ backgroundColor: "#FFBF46" }}
          >
            New Game
          </Button>

          <Button
              href="/"
              variant="contained"
              size="large"
              style={{ backgroundColor: "#FFBF46" }}
          >
            History
          </Button>
        </div>
    );
  }
}

const url = ({state}) => `/game/${state.difficulty}`;

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    maxHeight: "10vh",
  }
};
