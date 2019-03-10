import axios from 'axios';
import queryString from 'query-string';
import { login } from './util';
import {ENV, DEV_API, API} from '../config';

const createFetch = axios.create();

const domain = {
    dev: DEV_API,
    test: DEV_API,
    pro: API,
};
createFetch.defaults.withCredentials = true;
createFetch.defaults.baseURL = domain[ENV];

createFetch.interceptors.request.use(async config => {
    const options = { ...config };
    // TODO sessionid?
    if (options.method && config.method.toUpperCase() === 'POST') {
        options.headers['Content-Type'] = 'application/json';
        // options.data = queryString.stringify(config.data);
    }
    return options;
});

createFetch.interceptors.response.use(response => {
    const { code } = response.data;
    if (code == -2) {
        login();
    }
    response.json = () => response.data;

    return Promise.resolve(response);
});

export default createFetch;
