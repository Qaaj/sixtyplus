import { get, post, put, del } from '../RequestUtil';
import Constants from '../../config/Constants';

let currentProtocol = window.location.protocol;
let baseUrl = window.location.host;

const API_URL = `${currentProtocol}//${baseUrl}/api`;

export function changeUILanguage(data) {

    let url = `${API_URL}/createSingleBriefingAndLoad`;

    _post({url, data})
        .then(
        (response) => {

            //ServerActionCreators.briefingCreatedAndLoaded(response.body.response);

        },

        (error) => {

            console.error('Error: ', error);
        }
    );
};
