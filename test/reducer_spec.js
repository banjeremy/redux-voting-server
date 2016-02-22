import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  it('has an initial state', () => {
    const initialState = undefined;

    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting']
    };

    expect(reducer(initialState, action)).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Trainspotting']
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });

    const action = {
      type: 'NEXT'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles vote', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 2,
          '28 Days Later': 1
        }
      }
    });

    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 3,
          '28 Days Later': 1
        }
      }
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'NEXT'}
    ];

    const nextState = actions.reduce(reducer, Map());

    expect(nextState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });
});
