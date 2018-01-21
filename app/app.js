import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import 'normalize.css';
import './assets/styles/app.scss';
import 'milligram';
import 'font-awesome/css/font-awesome.min.css';

import Home from './scenes/Home';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
        </Router>
    </Provider>,
    document.getElementById('app')
 );
