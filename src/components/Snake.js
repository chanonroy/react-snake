import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import { Layer, Rect, Stage, Group } from 'react-konva';


export class Snake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      interval_id: null,
      board: {
        max_height: props.board.height,
        max_width: props.board.width
      },
      position: {
        height: Math.floor(props.board.height / 2),
        width: Math.floor(props.board.width / 2),
      },
      direction: 'right',
      speed: 65,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move_snake = this.move_snake.bind(this);
    this.toggle_game = this.toggle_game.bind(this);
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

  // ---- LIFEYCLE HOOKS ----

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  // ---- METHODS RE: SNAKE MOVEMENT ----

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

    } else if (event.key == 'Enter' || event.key == ' ') {
      if (this.state.start === false) {
        this.setState(() => {
          return { start: true }
        })
        this.toggle_game('on');
      }
    }
  }

  move_snake() {
    var direction = this.state.direction;
    var current_height = this.state.position.height;
    var current_width = this.state.position.width;
    var max_height = this.state.board.max_height;
    var max_width = this.state.board.max_width;

    // Snake hits the edge - Game Over
    if (current_width < 0 || current_width >= max_width) {
      return this.toggle_game('off');
    } else if (current_height < 0 || current_height >= max_height) {
      return this.toggle_game('off');
    }

    // Snake moves in a certain direction
    if (direction === 'up') {
      this.setState(() => {
        return {
          position: { height: current_height - 10, width: current_width }
        }
      })
    } else if (direction === 'right') {
      this.setState(() => {
        return {
          position: { height: current_height, width: current_width + 10 }
        }
      })
    } else if (direction === 'down') {
      this.setState(() => {
        return {
          position: { height: current_height + 10, width: current_width }
        }
      })
    } else if (direction === 'left') {
      this.setState(() => {
        return {
          position: { height: current_height, width: current_width - 10 }
        }
      })
    }

  }

  // ---- METHODS RE: STATE OF GAME ----

  toggle_game(str) {
    // str = 'on', 'off'

    if (str === 'on') {
      var intervalID = setInterval(this.move_snake, this.state.speed);
      this.setState(() => {
        return { interval_id: intervalID }
      })
    } else if (str === 'off') {
      alert('Game Over');
      clearInterval(this.state.interval_id);
      this.setState(() => {
        return {
          start: false,
          position: {
            height: Math.floor(this.state.board.max_height / 2),
            width: Math.floor(this.state.board.max_width / 2),
          },
        }
      })
    }

  }

}

Snake.propTypes = {
  board: propTypes.object.isRequired,
}
