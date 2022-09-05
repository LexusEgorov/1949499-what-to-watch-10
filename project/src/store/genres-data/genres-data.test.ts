import { DEFAULT_FILTER } from '../../const';
import { GenresData } from '../../types/state';
import { GENRE } from '../../utils/mocks';
import { genresData, resetGenre, setGenre } from './genres-data';

describe('Reducer: genres', () => {
  let state: GenresData;

  beforeEach(() => {
    state = {
      currentGenre: DEFAULT_FILTER,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(genresData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentGenre: DEFAULT_FILTER,
      });
  });

  describe('resetGenre test', () => {
    it('should update: currentGenre to "All genres"', () => {
      expect(genresData.reducer(state, {type: resetGenre.type}))
        .toEqual({
          currentGenre: 'All genres',
        });
    });
  });

  describe('setGenre test', () => {
    it('should update: currentGenre to payloadedGenre', () => {
      expect(genresData.reducer(state, {type: setGenre.type, payload: GENRE}))
        .toEqual({
          currentGenre: GENRE,
        });
    });
  });
});
