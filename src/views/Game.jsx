import React from "react";
import { Layer, Rect, Stage, Group } from "react-konva";

// Functional Stateless Components
import { Header } from "../components/Header";
import { Board } from "../components/Board";
import { Snake } from "../components/Snake";
import { Food } from "../components/Food";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game_start: false,
      interval_id: null,
      board: {
        max_width: 1000,
        max_height: 500,
      },
      colors: {
        board: "#223041",
        snake: "Gold",
      },
      food_position: {
        x: -10,
        y: -10,
      },
      food_count: 0,
      snake_position: {
        x: Math.floor(1000 / 2),
        y: Math.floor(500 / 2),
      },
      snake_tail: [], // nested arrays for tail rendering
      direction: "right",
      speed: 50,
    };

    this.spawn_food = this.spawn_food.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move_snake = this.move_snake.bind(this);
    this.toggle_game = this.toggle_game.bind(this);
  }

  // JSX
  render() {
    return (
      <div>
        <Header score={this.state.food_count} />

        <Stage
          width={this.state.board.max_width}
          height={this.state.board.max_height}
        >
          <Layer>
            <Board
              width={this.state.board.max_width}
              height={this.state.board.max_height}
              color={this.state.colors.board}
            />
          </Layer>
          <Layer>
            <Snake
              color={this.state.colors.snake}
              x={this.state.snake_position.x}
              y={this.state.snake_position.y}
            />
            {this.state.snake_tail.map((tail, index) => {
              return (
                <Snake
                  key={index}
                  color={this.state.colors.snake}
                  x={tail[0]}
                  y={tail[1]}
                />
              );
            })}
          </Layer>
          <Layer>
            <Food
              x={this.state.food_position.x}
              y={this.state.food_position.y}
            />
          </Layer>
        </Stage>

        {this.state.game_start ? (
          <div className="footer"> Happy Hunting! </div>
        ) : (
          <div className="footer">
            {" "}
            Use WASD or the arrow keys to move. Press Enter or Space to begin{" "}
          </div>
        )}
      </div>
    );
  }

  // Lifecycle Hook
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  // Spawns food at state of food position
  spawn_food() {
    var x_max = this.state.board.max_width - 10;
    var y_max = this.state.board.max_height - 10;
    var x_new = Math.floor((Math.random() * (x_max - 0 + 1) + 0) / 10) * 10;
    var y_new = Math.floor((Math.random() * (y_max - 0 + 1) + 0) / 10) * 10;

    this.setState(() => {
      return {
        food_position: { x: x_new, y: y_new },
      };
    });
  }

  // KeyPress Handling
  handleKeyPress(event) {
    // For validation that snake can't go back on itself
    var current_dir = this.state.direction;

    if (
      (event.key == "ArrowUp" || event.key == "w") &&
      current_dir !== "down"
    ) {
      this.setState(() => {
        return { direction: "up" };
      });
    } else if (
      (event.key == "ArrowRight" || event.key == "d") &&
      current_dir !== "left"
    ) {
      this.setState(() => {
        return { direction: "right" };
      });
    } else if (
      (event.key == "ArrowDown" || event.key == "s") &&
      current_dir !== "up"
    ) {
      this.setState(() => {
        return { direction: "down" };
      });
    } else if (
      (event.key == "ArrowLeft" || event.key == "a") &&
      current_dir !== "right"
    ) {
      this.setState(() => {
        return { direction: "left" };
      });
    } else if (event.key == "Enter" || event.key == " ") {
      if (this.state.game_start === false) {
        this.setState(() => {
          return { game_start: true };
        });
        this.spawn_food();
        this.toggle_game("on");
      }
    }
  }

  // Moving Snake + Collision Detection
  move_snake() {
    var direction = this.state.direction;
    var current_height = this.state.snake_position.y;
    var current_width = this.state.snake_position.x;
    var max_height = this.state.board.max_height;
    var max_width = this.state.board.max_width;
    var tail = this.state.snake_tail;

    // TAIL ARRAY MUTATION ----

    // Shift tail array to the left
    if (tail.length > 1) {
      for (var i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
      }
    }

    // Add the latest head position to right of the array
    tail[tail.length - 1] = [current_width, current_height];
    this.setState(() => {
      return { snake_tail: tail };
    });

    // COLLISION DETECTION ----

    // Snake hits itself - Game Over (can only hit when over 4 tail items)
    if (tail.length > 4) {
      for (var i = 0; i < tail.length - 4; i++) {
        if (tail[i][0] === current_width && tail[i][1] === current_height) {
          return this.toggle_game("off");
        }
      }
    }

    // Snake hits the edge - Game Over
    if (current_width < 0 || current_width >= max_width) {
      return this.toggle_game("off");
    } else if (current_height < 0 || current_height >= max_height) {
      return this.toggle_game("off");
    }

    // Snake eats food
    if (
      current_height === this.state.food_position.y &&
      current_width === this.state.food_position.x
    ) {
      this.setState(() => {
        tail.push(
          [current_width, current_height],
          [current_width, current_height],
          [current_width, current_height],
          [current_width, current_height]
        );
        return {
          food_count: this.state.food_count + 1,
          snake_tail: tail,
        };
      });
      this.spawn_food();
    }

    // SNAKE MOVEMENT DIRECTION ----

    // Direction derived from window event listener
    if (direction === "up") {
      this.setState(() => {
        return {
          snake_position: { y: current_height - 10, x: current_width },
        };
      });
    } else if (direction === "right") {
      this.setState(() => {
        return {
          snake_position: { y: current_height, x: current_width + 10 },
        };
      });
    } else if (direction === "down") {
      this.setState(() => {
        return {
          snake_position: { y: current_height + 10, x: current_width },
        };
      });
    } else if (direction === "left") {
      this.setState(() => {
        return {
          snake_position: { y: current_height, x: current_width - 10 },
        };
      });
    }
  }

  // Turning game 'off' or 'on'.
  toggle_game(str) {
    if (str === "on") {
      var interval_id = setInterval(this.move_snake, this.state.speed);
      this.setState(() => {
        return { interval_id: interval_id };
      });
    } else if (str === "off") {
      alert(`Game Over. Your score was ${this.state.food_count}.`);
      clearInterval(this.state.interval_id);

      this.setState(() => {
        return {
          game_start: false,
          food_count: 0,
          food_position: {
            x: -10,
            y: -10,
          },
          snake_position: {
            x: Math.floor(this.state.board.max_width / 2),
            y: Math.floor(this.state.board.max_height / 2),
          },
          snake_tail: [],
        };
      });
    }
  }
}
