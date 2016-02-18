import { List, Map } from 'immutable';

export function setEntries(currentState, entries) {
  return currentState.set('entries', List(entries));
};

export function next(currentState) {
  const entries = currentState.get('entries');

  return currentState.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}
