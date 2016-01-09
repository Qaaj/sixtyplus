import { get, post, put, del } from './RequestUtil';
import ServerActionCreators from '../actions/ServerActionCreators';
import NotificationActions from '../actions/NotificationActionCreators';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;
