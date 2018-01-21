import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import TodoList from '../../components/TodoList';

import style from './style.scss';

@CSSModules(style)
class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <div className={`container ${style['home-scene']}`} >
            <TodoList />
        </div>
    );
  }
}

export default Home;
