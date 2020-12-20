import React from 'react';

export class Time extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      seconds: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
    this.setState({seconds: 0});
  };

  tick = () => {
    this.setState({seconds: secondsBetween(this.props.creationDate, this.props.endDate)});
    if(this.props.endDate !== null) {
      clearInterval(this.timer);
    }
  };

  render() {
    return (
        <div> Time: {this.state.seconds} seconds </div>
    );
  }
}

const secondsBetween = (creationDate, endDate) => {
  const date1 = new Date(creationDate);
  const date2 = endDate ? new Date(endDate) : new Date();
  const diff = date2.getTime() - date1.getTime();
  return Math.round(diff / 1000);
};
