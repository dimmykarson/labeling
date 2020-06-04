import React, { Component } from 'react';

class Argument extends Component {


  render() {
    return (
      <div className="argument">
        {this.props.text}
      </div>
    );
  }
}


export default Argument;