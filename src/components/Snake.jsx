import React from "react";
import propTypes from "prop-types";

import { Rect } from "react-konva";

export function Snake(props) {
  return (
    <Rect x={props.x} y={props.y} width={10} height={10} fill={props.color} />
  );
}

Snake.propTypes = {
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
  color: propTypes.string.isRequired,
};
