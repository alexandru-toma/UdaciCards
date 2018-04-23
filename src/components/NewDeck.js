import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../utils/api'
import { addDeck } from '../actions/index'
import AddNewCard from './AddNewCard';

class NewDeck extends Component {
    componentWillMount() {
        this.setState({
            deckName: ''
        })
    }

    addNewDeck = () => {
        const deckName = this.state.deckName;
        const { decks } = this.props;

        if (!deckName.trim()) {
            Alert.alert(
                'Empty deck name',
                'The deck name cannot be empty!'
            );
        } else if (decks[deckName]) {
            Alert.alert(
                'Duplicate name',
                'Deck name already exists!'
            );
        } else {
            const newDeck = { [deckName]: { title: deckName, questions: [] } };

            this.props.dispatch(addDeck(newDeck));
            addNewDeck(newDeck);

            Alert.alert(
                'Successful', 'Deck Added',
                [
                    {
                        text: 'OK', onPress: () => this.props.navigation.navigate('IndividualDeck', {
                            title: deckName,
                            questions: []
                        })
                    },
                ],
            );

            this.setState({ deckName: '' });
        }
    }

    render() {
        return (
            <View style={style.container}>
                <Text
                    style={{ fontSize: 16 }}>
                    What is the title of your new deck ?
                </Text>

                <TextInput
                    value={this.state.deckName}
                    style={style.textInput}
                    onChangeText={deckName => this.setState({ deckName })} />

                <TouchableOpacity
                    onPress={this.addNewDeck}
                    style={style.submitButton}>
                    <Text style={style.submitText}>Sumbit</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
    },
    textInput: {
        width: 250,
        height: 30,
        padding: 6,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        margin: 24,
    },
    submitButton: {
        padding: 10,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    submitText: {
        color: 'white',
        fontSize: 20,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(NewDeck);
