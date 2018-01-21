import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Auth from '../../components/Auth';

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
