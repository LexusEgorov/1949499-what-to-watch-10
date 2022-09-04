import { NameSpace } from '../../const';
import { State } from '../../types/types';

export const getCurrentGenre = (state: State) : string => state[NameSpace.Genre].currentGenre;
