import React from 'react';
import { Board } from '../components/Board';
import { Layer, Rect, Stage, Group } from 'react-konva';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {
        height: 500,
        width: 1170,
      },
      colors: {
        board: 'MediumSeaGreen'
      }
    };

  }

  render() {
    return (
      <div>
        <h1> Snake Game </h1>
        <Stage width={this.state.canvas.width} height={this.state.canvas.height}>
          <Layer>
            <Board
              width={this.state.canvas.width}
              height={this.state.canvas.height}
              color={this.state.colors.board}/>
          </Layer>
        </Stage>
      </div>
    )
  }
}
