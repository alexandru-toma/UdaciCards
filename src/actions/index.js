import * as Types from './types';

export const getDecks = decks => ({
    type: Types.GET_ALL_DECKS,
    decks,
});

export const addDeck = deck => ({
    type: Types.ADD_DECK,
    deck,
});

export const addCard = payload => ({
    type: Types.ADD_QUESTION,
    payload,
});