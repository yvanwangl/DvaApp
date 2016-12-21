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
        list, total, loading, current, field, keyword,
        currentItem, maskVisible, maskType,
    } = users;

    const userSearchProps = {
        field,
        keyword,
        onSearch(fieldsValue){
            dispatch(routerRedux.push({
                pathname:'/users',
                query: {...fieldsValue, page:1}
            }));
        },
        onAdd(){
            dispatch({
                type:'users/showMask',
                payload:{
                    maskType:'create',
                }
            });
        }
    };
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
        },
        onModify(item){
            dispatch({
                type:'users/showMask',
                payload:{
                    maskType:'modify',
                    currentItem:item
                }
            });
        },
        onDel(id){
            dispatch({
                type:'users/del',
                payload:id,
            });
        }
    };
    const userModalProps = {
        item: maskType=='create'? {}:currentItem,
        type: maskType,
        visible: maskVisible,
        onConfirm(data){
            dispatch({
                type:`users/${maskType}`,
                payload: data
            });
        },
        onCancel(){
            dispatch({
                type:'users/hideMask'
            });
        }
    };

    const UserModalGen = ()=>(<UserModal {...userModalProps}/>);

    return (
        <div className={normal}>
            <UserSearch {...userSearchProps}/>
            <UserList {...userListProps}/>
            <UserModalGen />
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
