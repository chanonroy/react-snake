import React from 'react';
import propTypes from 'prop-types';

export function Header(props) {
    return (
      <h1 className="header">
        <div className="header__title">
          <img className="header__icon" src="dist/assets/snake.svg" alt="snake"/>
          Snake Game
        </div>
        <div className="header__stats">
          <i className="fa fa-trophy header__score" aria-hidden="true"></i>
          <span> {props.score} </span>
        </div>
      </h1>
    )
}

Header.propTypes = {
  score: propTypes.number.isRequired
}
