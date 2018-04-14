import {AsyncStorage} from 'react-native';
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'

export function getAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDeckResults);
}