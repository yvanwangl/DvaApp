import React, {Component, PropTypes} from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';
import {Link} from 'dva/router';
import UserSearch from '../../components/Users/UserSearch/UserSearch';
import UserList from '../../components/Users/UserList/UserList';
import UserModal from '../../components/Users/UserModal/UserModal';
import {normal, title, welcome, list} from './index.css';

function Users({location, dispatch, users}) {
    const {
        list,
        total,
        loading,
        current,
        field,
        keyword,
        currentItem,
        maskVisible,
        maskType,
    } = users;

    const userSearchProps = {};
    const userListProps = {
        current,
        total,
        dataSource:list,
        loading,
        onPageChange(page){
            dispatch(routerRedux.push({
                pathname:'/users',
                query: {field, keyword, page}
            }));
        }
    };
    const userModalProps = {};

    return (
        <div className={normal}>
            <UserSearch {...userSearchProps}/>
            <UserList {...userListProps}/>
            <UserModal {...userModalProps}/>
        </div>
    );
}

Users.propTypes = {
    users: PropTypes.object,
};

function mapStateToProps({users}) {
    return {users};
}

export default connect(mapStateToProps)(Users);
