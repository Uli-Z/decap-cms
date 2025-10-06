import { createHashHistory } from 'history';

import { getEntryPath } from '../lib/urlHelper';

const history = createHashHistory();

export function navigateToCollection(collectionName: string) {
  return history.push(`/collections/${collectionName}`);
}

export function navigateToNewEntry(collectionName: string) {
  return history.replace(`/collections/${collectionName}/new`);
}

export function navigateToEntry(collectionName: string, slug: string) {
  return history.replace(getEntryPath(collectionName, slug));
}

export { history };
