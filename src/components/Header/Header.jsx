import React, {Component} from 'react';
import {Menu} from 'antd';
import NavLink from '../NavLink/NavLink';
import styles from './index.css';

const MenuItem = Menu.Item;

function Header() {
    return (
        <Menu mode='horizontal' theme="dark">
            <MenuItem key="home">
                <NavLink target='/' linkText="首页"/>
            </MenuItem>
            <MenuItem key="users">
                <NavLink target='/users' linkText="用户"/>
            </MenuItem>
            <MenuItem key="404">
                <NavLink target='/not-found-page' linkText="404"/>
            </MenuItem>
        </Menu>
    );
}

export default Header;