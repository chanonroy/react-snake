import React from "react";
import propTypes from "prop-types";

import { Rect } from "react-konva";

export function Food(props) {
  return <Rect x={props.x} y={props.y} width={10} height={10} fill="white" />;
}

Food.propTypes = {
  x: propTypes.number.isRequired,
  y: propTypes.number.isRequired,
};
