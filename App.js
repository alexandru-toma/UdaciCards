import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Deck from './src/components/Deck'
import Decks from './src/components/Decks'
import NewDeck from './src/components/NewDeck'
import { createStore } from 'redux'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import reducer from './src/reducers/index.js'
import IndividualDeck from './src/components/IndividualDeck'
import StartQuiz from './src/components/Quiz/StartQuiz'
import AddNewCard from './src/components/AddNewCard'
import { Constants } from 'expo'


function UdaciCardStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    DeckList: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'All Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ion-ios-home' size={30} color={tintColor} />
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ion-ios-plus-outline' size={30} color={tintColor} />
        },
    },
});

const AppNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: { title: 'Home' },
    },
    IndividualDeck: {
        screen: IndividualDeck,
        navigationOptions: {
            title: 'Individual Deck',
            headerTintColor: '#000',
        },
    },
    StartQuiz: {
        screen: StartQuiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: '#000',
        },
    },
    AddNewCard: {
        screen: AddNewCard,
        navigationOptions: {
            title: 'Add New Card',
            headerTintColor: '#000',
        },
    },
});

export default class App extends React.Component {
    render() {
        return <Provider store={createStore(reducer)}>
            <View style={{ flex: 1 }}>
                <UdaciCardStatusBar backgroundColor='black' barStyle='light-content' />
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
