import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import 'normalize.css';
import './assets/styles/app.scss';
import 'milligram';
import 'font-awesome/css/font-awesome.min.css';

import Home from './scenes/Home';

import store from './store';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" exact component={Home}/>
            {/* <Route path="*" component={ErrorHandler}/> */}
        </Router>
    </Provider>,
    document.getElementById('app')
 );
