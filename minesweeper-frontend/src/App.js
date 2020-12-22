import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NavBar} from "./Components/NavBar";
import {History} from "./Components/History";
import {Game} from "./Components/Game"
import './App.css';

function App() {
  return (
      <div className="App">
        <div style={appStyle}>
          <div style={{padding: "5%"}}>
            <Router id="router">
              <NavBar/>
              <Switch>
                <Route
                    path="/game/:user/new/:difficulty"
                    component={Game}
                />
                <Route path="/game/:user/:id"
                  component={Game}
                />
                <Route path="/history/:user"
                  component={History}
                />
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
