import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Deck from './Deck'
import { connect } from 'react-redux'
import { getDecks } from '../actions/index'
import { getAllDecks } from '../utils/api'

class IndividualDeck extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        getAllDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => this.setState(() => ({ ready: true })));
    }

    render() {
        const { title, questions } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Deck
                    title={title}
                    questions={questions} />
                <View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('AddNewCard', { title, questions })}>
                        <Text style={styles.buttonText}>
                            Add New Card
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('StartQuiz', { title, questions })}>
                        <Text style={styles.buttonText}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    button: {
        padding: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    }
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(IndividualDeck);