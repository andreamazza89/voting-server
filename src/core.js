import { List } from 'immutable';

export function setEntries(state, entries) {
  entries = List(entries)
  return state.set('entries', entries)
}
