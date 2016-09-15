import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('Immutability', () => {

  describe('A tree', () => {

    function addMovie(currentState, movie) {
      return currentState.set(
        'movies', 
        currentState.get('movies').push(movie))
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Movie 1', 'Movie 2')
      });
      let nextState = addMovie(state, 'Sunshine')

      expect(nextState).to.equal(Map({
        movies: List.of('Movie 1', 'Movie 2', 'Sunshine')
      }));

      expect(state).to.equal(Map({
        movies: List.of('Movie 1', 'Movie 2')
      }));
    })


  })
  
  describe('A list', () => {
  
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', 'Other Movie');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting', 
        'Other Movie', 
        'Sunshine'));

      expect(state).to.equal(List.of(
        'Trainspotting', 
        'Other Movie'));
    })
  })
})
