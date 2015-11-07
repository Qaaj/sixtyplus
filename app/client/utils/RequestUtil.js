import superagent from 'superagent';
import Promise from 'bluebird';

let request = Promise.promisify(superagent);

const TIMEOUT = 30000; // ms

export function get(args) {
    return request
        .get(args.url)
        .timeout(TIMEOUT)
        .query(args.params)
        .set('x-request-time', moment().format());
}

export function post(args) {
    return request
        .post(args.url)
        .query(args.params)
        .send(args.data);
}

export function put(args) {
    return request
        .put(args.url)
        .query(args.params)
        .send(args.data);
}

export function del(args) {
    return request
        .del(args.url)
        .query(args.params);
}
