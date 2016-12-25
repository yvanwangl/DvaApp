/**
 * Created by wyf on 2016/12/16.
 */
import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
    return request(`/api/users?${qs.stringify(params)}`);
}

export async function create(params) {
    return request('/api/users', {
        method: 'post',
        body: qs.stringify(params)
    });
}

export async function modify(params) {
    return request('/api/users', {
        method: 'put',
        body: qs.stringify(params)
    });
}

export async function del(params) {
    return request('/api/users', {
        method: 'delete',
        body: qs.stringify(params)
    });
}