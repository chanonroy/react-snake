import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import { Layer, Rect, Stage, Group } from 'react-konva';


export class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        // start in the center
        height: Math.floor(props.board.height / 2),
        width: Math.floor(props.board.width / 2)
      },
      speed: {
        xSpeed: 0,
        ySpeed: 0,
      }
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {

    if (event.key == 'ArrowUp' || event.key == 'w') {

      this.setState(() => {
        return {
          position: {
            height: this.state.position.height - 10,
            width: this.state.position.width
          }
        }
      })

    } else if (event.key == 'ArrowRight' || event.key == 'd') {

      this.setState(() => {
        return {
          position: {
            height: this.state.position.height,
            width: this.state.position.width + 10
          }
        }
      })


    } else if (event.key == 'ArrowDown' || event.key == 's') {

      this.setState(() => {
        return {
          position: {
            height: this.state.position.height + 10,
            width: this.state.position.width
          }
        }
      })

    } else if (event.key == 'ArrowLeft' || event.key == 'a') {

      this.setState(() => {
        return {
          position: {
            height: this.state.position.height,
            width: this.state.position.width - 10
          }
        }
      })

    }

  }

  render() {
    return (
        <Rect
            x={this.state.position.width}
            y={this.state.position.height}
            width={10}
            height={10}
            fill='gold'
            onClick={this.handleKeyPress}
        />
    )
  }
}

Snake.propTypes = {
  board: propTypes.object.isRequired,
}
