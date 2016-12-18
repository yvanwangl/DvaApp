import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';
import Users from './routes/Users/Users.jsx';

export default function ({history}) {
    return (
        <Router history={history}>
            <Route path="/users" component={Users}/>
        </Router>
    );
};
