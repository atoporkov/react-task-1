import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import APP_CONFIG from '../../config';

import style from './style.scss';

@CSSModules(style)
class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className={style['login-scene']}>
            Login
        </div>
    );
  }
}

export default Login;
