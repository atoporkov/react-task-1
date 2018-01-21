import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import style from './style.scss';

@CSSModules(style)
class Auth extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <div className={style['auth-component']}>
            Todo
        </div>
    );
  }
}

export default Auth;
