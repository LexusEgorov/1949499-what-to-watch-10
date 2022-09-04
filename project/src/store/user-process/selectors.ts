import { NameSpace } from '../../const';
import { State } from '../../types/types';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State) : string => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: State) : UserData => state[NameSpace.User].userData;
