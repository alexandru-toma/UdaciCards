import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import { addCard } from '../actions/index'
import { addNewCard } from '../utils/api'
import { connect } from 'react-redux'

class AddNewCard extends Component {
    componentWillMount() {
        this.setState({
            question: '',
            answer: '',
        })
    }

    addNewCard = () => {
        const { question, answer } = this.state;
        const { title, questions } = this.props.navigation.state.params;
        const params = { title, questions, question, answer };

        if (!question) {
            Alert.alert(
                'Empty field',
                'Question cannot be empty!'
            );
        } else if (!answer) {
            Alert.alert(
                'Empty field',
                'Answer cannot be empty!'
            )
        }
        else {
            const newCard = { question, answer }
            this.props.dispatch(addCard(params));
            addNewCard({ newCard, deckName: title });

            Alert.alert(
                'Successful', 'Card Added',
                [
                    {
                        text: 'OK', onPress: () => this.props.navigation.goBack()
                    },
                ],
            );

            this.setState({
                question: '',
                answer: '',
            });
        }
    }

    render() {
        return (
            <View style={style.container}>
                <TextInput>Question:</TextInput>
                <TextInput
                    value={this.state.question}
                    style={style.input}
                    onChangeText={question => this.setState({ question })} />
                <TextInput>Answer:</TextInput>
                <TextInput
                    value={this.state.answer}
                    style={style.input}
                    onChangeText={answer => this.setState({ answer })} />

                <TouchableOpacity
                    onPress={this.addNewCard}
                    style={style.submitButton}>
                    <Text style={style.submitText}>SUBMIT</Text>

                </TouchableOpacity>
            </View>
        );
    }
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: 300,
        height: 56,
        padding: 12,
        borderWidth: 1,
        borderColor: '#7f7f7f',
        margin: 16
    },
    submitButton: {
        backgroundColor: '#000',
        padding: 12,
        height: 44,
    },
    submitText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
    },
});


function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddNewCard);