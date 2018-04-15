import {AsyncStorage} from 'react-native';
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'

export function getAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDeckResults);
}

export function addNewDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}