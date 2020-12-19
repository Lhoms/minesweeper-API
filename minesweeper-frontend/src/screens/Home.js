import React from 'react';
import RestClient from "../rest/RestClient";
import { useParams, Link } from "react-router-dom";

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
        <Link to="/game" />
    );
  }
}
