import { hashHistory } from 'dva/router';
import { query } from '../services/users';

export default {

    namespace: 'users',

    state: {
        list: [],
        total: null,
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
                        payload:{}
                    });
                }
            });
        },
    },

    effects: {
        *query({page}, {select, call, put}){
            yield put({ type: 'showLoading' });
            const { data } = yield call(query, {page});
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
        showLoading(state, action){
            return {...state, loading:true}
        },
        hideLoading(){},
        showMask(){},
        hideMask(){},
        querySuccess(state, action){
            return {...state, ...action.payload, loading:false};
        },
        createSuccess(){},
        modifySuccess(){},
        delSuccess(){},
    },

}
