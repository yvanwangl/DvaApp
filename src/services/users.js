/**
 * Created by wyf on 2016/12/16.
 */
import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
    return request(`/api/users?${qs.stringify(params)}`);
}