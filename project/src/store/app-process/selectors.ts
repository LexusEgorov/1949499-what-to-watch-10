import { NameSpace } from '../../const';
import { State } from '../../types/types';

export const getIsError = (state: State) : boolean => state[NameSpace.App].isError;

export const getIsNotFound = (state: State) : boolean => state[NameSpace.App].isNotFound;

export const getIsLoading = (state: State) : boolean => state[NameSpace.App].isLoading;
