import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';
import HomePage from './routes/HomePage/HomePage.jsx';
import IndexPage from './routes/IndexPage/IndexPage.jsx';
import Users from './routes/Users/Users.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';

export default function ({history}) {
    return (
        <Router history={history}>
            <Route path="/" component={HomePage}>
                <IndexRoute component={IndexPage}/>
                <Route path="/users" component={Users}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    );
};
