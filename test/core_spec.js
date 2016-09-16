import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days')
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days']
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days')
      }));
    });
  });

  describe('next', () => {
    
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'), 
        vote: Map({ pair: List.of('Trainspotting', '28 Days') })
      }));
    });
  });

  describe('vote', () => {
  
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({ pair: List.of('Trainspotting', '28 Days') }),
        entries: List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        vote: Map({ 
          pair: List.of('Trainspotting', '28 Days'),
          tally: Map({ 'Trainspotting': 1 })
        }),
        entries: List()
      }));
    })

     it('adds to existing tally for the voted entry', () => {
       const state = Map({
         vote: Map({
           pair: List.of('Trainspotting', '28 Days Later'),
           tally: Map({
             'Trainspotting': 3,
             '28 Days Later': 2
           })
         }),
         entries: List()
       });
        const nextState = vote(state, 'Trainspotting');
        expect(nextState).to.equal(Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 4,
              '28 Days Later': 2
            })
          }),
          entries: List()
        }));
      });
  })
});
