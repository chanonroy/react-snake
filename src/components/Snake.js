import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import { Layer, Rect, Stage, Group } from 'react-konva';


export class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      position: {
        height: Math.floor(props.board.height / 2),
        width: Math.floor(props.board.width / 2),
      },
      direction: 'right',
      speed: 70,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.snakeMove = this.snakeMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    setInterval(this.snakeMove, this.state.speed);
  }

  snakeMove() {
    var direction = this.state.direction;

    if (direction === 'up') {
      this.setState(() => {
        return {
          position: {
            height: this.state.position.height - 10,
            width: this.state.position.width
          }
        }
      })
    } else if (direction === 'right') {
      this.setState(() => {
        return {
          position: {
            height: this.state.position.height,
            width: this.state.position.width + 10
          }
        }
      })
    } else if (direction === 'down') {
      this.setState(() => {
        return {
          position: {
            height: this.state.position.height + 10,
            width: this.state.position.width
          }
        }
      })
    } else if (direction === 'left') {
      this.setState(() => {
        return {
          position: {
            height: this.state.position.height,
            width: this.state.position.width - 10
          }
        }
      })
    } else if (direction === 'pause') {
      clearInterval(this.snakeMove);
    }

  }

  handleKeyPress(event) {
    // For validation that snake can't go back on itself
    var current_dir = this.state.direction;

    if ((event.key == 'ArrowUp' || event.key == 'w') && current_dir !== 'down') {
      this.setState(() => { return { direction: 'up' } })

    } else if ((event.key == 'ArrowRight' || event.key == 'd') && current_dir !== 'left' )  {
      this.setState(() => { return { direction: 'right' } })

    } else if ((event.key == 'ArrowDown' || event.key == 's') && current_dir !== 'up') {
      this.setState(() => { return { direction: 'down' } })

    } else if ((event.key == 'ArrowLeft' || event.key == 'a') && current_dir !== 'right') {
      this.setState(() => { return { direction: 'left' } })

    } else if (event.key == ' ') {
      this.setState(() => { return { direction: 'pause' } })
    }
  }

  gameOver() {
    clearInterval(this.snakeMove);
    alert('Game Over');
  }

  render() {
    return (
        <Rect
            x={this.state.position.width}
            y={this.state.position.height}
            width={10}
            height={10}
            fill='gold'
        />
    )
  }
}

Snake.propTypes = {
  board: propTypes.object.isRequired,
}
