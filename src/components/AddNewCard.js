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

        if (!question.trim()) {
            Alert.alert(
                'Empty field',
                'Question cannot be empty!'
            );
        } else if (!answer.trim()) {
            Alert.alert(
                'Empty field',
                'Answer cannot be empty!'
            )
        }
        else {
            const card = { question, answer }
            const payload = { title, questions, question, answer };
            this.props.dispatch(addCard(payload));
            addNewCard({ question, answer, title });

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
                <TextInput style={style.label}>Question :</TextInput>
                <TextInput
                    value={this.state.question}
                    style={style.input}
                    onChangeText={question => this.setState({ question })} />
                <TextInput style={style.label}>Answer :</TextInput>
                <TextInput
                    value={this.state.answer}
                    style={style.input}
                    onChangeText={answer => this.setState({ answer })} />

                <TouchableOpacity
                    onPress={this.addNewCard}
                    style={style.button}>
                    <Text style={style.buttonText}>Submit</Text>
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
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        margin: 16
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
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    },
});


function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(AddNewCard);