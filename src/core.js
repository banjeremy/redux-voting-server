import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
};

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if (aVotes > bVotes) return [a];
  if (aVotes < bVotes) return [b];
  if (aVotes === bVotes) return [a, b];
};

export function next(state) {
  // find winners
  const winners = getWinners(state.get('vote'));

  // add winners back on to entries
  const entries = state.get('entries')
    .concat(winners);

  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    (tally) => tally + 1
  );
}
