import {hashHistory} from 'dva/router';
import {query, create, modify, del} from '../services/users';
import {parse} from 'qs';

export default {

    namespace: 'users',

    state: {
        list: [],
        total: null,
        field: '',
        keyword: '',
        loading: false,
        current: null,
        currentItem: {},
        maskVisible: false,
        maskType: 'create'
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location=> {
                if (location.pathname == '/users') {
                    dispatch({
                        type: 'query',
                        payload: location.query,
                    });
                }
            });
        },
    },

    effects: {
        *query({payload}, {call, put}){
            yield put({type: 'showLoading'});
            yield put({
                type: 'updateQueryKey',
                payload: {page: 1, field: '', keyword: '', ...payload}
            });
            const {data} = yield call(query, parse(payload));
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        total: data.page.total,
                        current: data.page.current
                    }
                });
            }
        },
        *create({payload}, {call, put}){
            yield put({type: 'hideMask'});
            yield put({type: 'showLoading'});
            const {data} = yield call(create, payload);
            if (data && data.success) {
                yield put({
                    type: 'createSuccess',
                    payload: {
                        list: data.data,
                        total: data.page.total,
                        current: data.page.current,
                        field: '',
                        keyword: '',
                    }
                });
            }
        },
        *modify({payload}, {select, call, put}){
            yield put({type: 'hideMask'});
            yield put({type: 'showLoading'});
            const id = yield select(({users}) => users.currentItem.id);
            const newUser = {...payload, id};
            const {data} = yield call(modify, newUser);
            if (data && data.success) {
                yield put({
                    type: 'modifySuccess',
                    payload: newUser
                });
            }
        },
        *del({payload}, {call, put}){
            yield put({type: 'showLoading'});
            const {data} = yield call(del, {id: payload});
            if (data && data.success) {
                yield put({
                    type: 'delSuccess',
                    payload,
                });
            }
        },
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.payload};
        },
        showLoading(state){
            return {...state, loading: true}
        },
        /*hideLoading(state){
         return {...state, loading:false};
         },*/
        showMask(state, action){
            return {...state, ...action.payload, maskVisible: true};
        },
        hideMask(state){
            return {...state, maskVisible: false};
        },
        querySuccess(state, action){
            return {...state, ...action.payload, loading: false};
        },
        createSuccess(state, action){
            return {...state, ...action.payload, loading: false};
        },
        modifySuccess(state, action){
            const updateUser = action.payload;
            const newList = state.list.map(user=>user.id === updateUser.id ? {...user, ...updateUser} : user);
            return {...state, list: newList, loading: false};
        },
        delSuccess(state, action){
            const newList = state.list.filter(user=>user.id !== action.payload);
            return {...state, list: newList, loading: false};
        },
        updateQueryKey(state, action){
            return {...state, ...action.payload};
        },
    },

}
