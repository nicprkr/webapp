import React, { Component } from 'react';

class Rooms extends Component {
    constructor(props){
        super(props);
    }
  render() {
      

    return (
    <div>
      <button onClick={this.props.showRoom.bind(this, "room1")}>Room 1</button>
      <button onClick={this.props.showRoom.bind(this, "room2")}>Room 2</button>
      <button onClick={this.props.showRoom.bind(this, "room3")}>Room 3</button>
      <button onClick={this.props.showRoom.bind(this, "room4")}>Room 4</button>
      <button onClick={this.props.showRoom.bind(this, "room5")}>Room 5</button>
    </div>
    );
  }
}

export default Rooms;
