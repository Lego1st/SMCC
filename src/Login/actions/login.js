import * as config from '../../store/globalConfig'
import md5 from "react-native-md5"
var baseUrl = config.baseUrl;
const {

    LOGIN_SUCCESS,

} = require('../libs/constants').default;
import * as API from '../libs/backend';
import {Actions} from 'react-native-router-flux'


export function loginSuccess (json) {
    return {
        type: LOGIN_SUCCESS,
        payload: json
    }
}

export function login(email, password) {
    console.log(md5.str_md5('InfoRe28111'))
    return dispatch => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }

          if (request.status === 200) {
              if(request.responseText != "False"){
                  let json = {};
                  json.user_id = request.responseText
                  json.user_name = email;
                  json.password = '1b4727a96eb05921e68228341642b529';
                  console.log(json)
                  dispatch(loginSuccess(json));
                  Actions.Mention()
              }else{

              }

          } else {
            console.warn('error');
          }
        };

        request.open('GET', baseUrl + 'LoginApi.aspx?username='+ email +'&pass=1b4727a96eb05921e68228341642b529');
        request.send();
    }
}
