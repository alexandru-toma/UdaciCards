import { AsyncStorage } from 'react-native';
import { formatDeckResults, DECKS_STORAGE_KEY } from './_decks'

export function getAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDeckResults);
}

export function addNewDeck(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export function addNewCard({ question, answer, title }) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        if (decks[title] && decks[title]['questions']) {
            decks[title]['questions'].push({ question, answer })
        }
        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    });
}

export function resetAsyncStorage() {
    return AsyncStorage.clear()
}
