import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1> Snake Game </h1>
        <Link className='button' to='/game'>
          Battle
        </Link>
      </div>
    )
  }
}
