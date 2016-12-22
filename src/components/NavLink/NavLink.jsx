import React, {Component} from 'react';
import { Link } from 'dva/router';

const NavLink = ({target, linkText})=>(
    <Link to={target} activeClassName='ant-menu-item-selected'>{linkText}</Link>
);

export default NavLink;