import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { UserData } from '../../types/user-data';
import { createFakeUser } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('Reducer: user', () => {
  let state: UserProcess;
  const fakeUser = createFakeUser();

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: {} as UserData,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: {},
      });
  });

  describe('checkAuthActinon test', () => {
    it('should authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(undefined, {type: checkAuthAction.fulfilled.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
        });
    });
    it('should authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(undefined, {type: checkAuthAction.rejected.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
        });
    });
  });

  describe('loginAction test', () => {
    it('should update: authorizationStatus to "AUTH", userData to <UserData> if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: fakeUser}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userData: fakeUser,
        });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: {},
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update: authorizationStatus to "NO_AUTH", userData to {} if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: {},
        });
    });
  });
});
