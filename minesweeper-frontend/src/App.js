import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Game } from "./screens/Game"
import './App.css';

function App() {
  return (
    <div className="App">
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            backgroundColor: "#575761",
            height: "100vh",
          }}
      >
        <NavBar />
        <div style={{ padding: "5%" }}>
          <Router>
            <Switch>
              <Route path="/game">
                <Game />
              </Route>
              <Route path="/game/:id">
                <Game />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

const NavBar = () => (
    <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flex: 1,
          padding: "5%",
          maxHeight: "10vh",
        }}
    >
      <Button
          href="/game"
          variant="contained"
          size="large"
          style={{ backgroundColor: "#FFBF46" }}
      >
        Nuevo Juego
      </Button>
      <Button
          href="/history"
          variant="contained"
          size="large"
          style={{ backgroundColor: "#FFBF46" }}
      >
        Historial
      </Button>
    </div>
);

export default App;
