import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Group } from 'react-konva';
import propTypes from 'prop-types';

export function Board(props) {
    return (
      <Rect
          x={0} y={0} width={props.width} height={props.height}
          fill={props.color}
      />
    )
}

Board.propTypes = {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  color: propTypes.string.isRequired,
}
