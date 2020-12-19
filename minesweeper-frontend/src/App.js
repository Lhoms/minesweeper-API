import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NavBar} from "./Components/NavBar";
import {Game} from "./screens/Game"
import './App.css';

function App() {
  return (
      <div className="App">
        <div style={appStyle}>
          <div style={{padding: "5%"}}>
            <Router>
              <NavBar/>
              <Switch>
                <Route
                    path="/game/:difficulty"
                    component={Game}
                />
                <Route path="/game/:id">
                  <Game/>
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
  );
}

const appStyle = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: "#575761",
  height: "150vh",
};

export default App;
