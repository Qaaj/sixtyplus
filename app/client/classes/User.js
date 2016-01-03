import {round} from '../../shared/helpers/formatting';
import { Map, fromJS } from 'immutable';
import assign from 'object-assign'

class User {

  constructor() {
  }

  init(userMap) {
    this._userMap = userMap;
    this._userObject = assign({}, userMap.toJS());
    return this;
  }

  get currency(){
    return this._userObject.settings.currency;
  }

  get js(){
    return this._userObject;
  }

  get map() {
    return this._userMap;
  }

}

export default User;
