import { hashHistory } from 'dva/router';
import { query } from '../services/users';
import { parse } from 'qs';

export default {

    namespace: 'users',

    state: {
        list: [],
        total: null,
        field:'',
        keyword:'',
        loading: false,
        current: null,
        currentItem: {},
        maskVisible: false,
        maskType: 'create'
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location=>{
                if(location.pathname == '/users'){
                    dispatch({
                        type:'query',
                        payload:location.query,
                    });
                }
            });
        },
    },

    effects: {
        *query({payload}, {call, put}){
            yield put({ type: 'showLoading' });
            yield put({
                type:'updateQueryKey',
                payload:{page:1, field:'', keyword:'', ...payload}
            });
            const { data } = yield call(query, parse(payload));
            if(data){
                yield put({
                    type:'querySuccess',
                    payload:{
                        list: data.data,
                        total: data.page.total,
                        current: data.page.current
                    }
                });
            }
        },
        *create(){},
        *modify(){},
        *del(){},
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.payload};
        },
        showLoading(state){
            return {...state, loading:true}
        },
        /*hideLoading(state){
            return {...state, loading:false};
        },*/
        showMask(state, action){
            return {...state, ...action.payload, maskVisible:true};
        },
        hideMask(state){
            return {...state, maskVisible:false};
        },
        querySuccess(state, action){
            return {...state, ...action.payload, loading:false};
        },
        createSuccess(){},
        modifySuccess(){},
        delSuccess(){},
        updateQueryKey(state, action){
            return {...state, ...action.payload};
        },
    },

}
