import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/components/Deck';
import Decks from './src/components/Decks';
import NewDeck from './src/components/NewDeck';
import {createStore} from 'redux';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import reducer from './src/reducers/index.js';

const Tabs = TabNavigator({
  DeckList: {
      screen: Decks,
      navigationOptions: {
          tabBarLabel: 'All Decks'
      },
  },
  NewDeck: {
      screen: NewDeck,
      navigationOptions: {
          tabBarLabel: 'New Deck',
      },
  },
}
);

const AppNavigator = StackNavigator({
Home: {
  screen: Tabs,
  navigationOptions: {title: 'Home'},
},
});

export default class App extends React.Component {
    render() {
      return <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
              <AppNavigator />
          </View>
      </Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
