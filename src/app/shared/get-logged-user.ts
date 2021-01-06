import {User} from '../models/user.model';
import {environment} from '../../environments/environment';

export function userObj(): User {
  const uObj = localStorage.getItem(environment.dsUserObj);
  return uObj ? JSON.parse(uObj) : null;
}
