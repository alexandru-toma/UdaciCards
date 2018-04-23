import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QuizFinished from './QuizFinished';
import { resetAsyncStorage } from '../../utils/api'
import {
    clearLocalNotification,
    setLocalNotification
  } from '../../utils/helpers'

class StartQuiz extends Component {
    state = {
        currentIndexOfQuestions: 0,
        totalOfCorrectAnswers: 0,
        questionView: true
    }

    componentWillMount() {
        //resetAsyncStorage(); -- for testing
    }

    onCorrectPress = () => {
        this.setState((previousState) => ({
            currentIndexOfQuestions: previousState.currentIndexOfQuestions + 1,
            totalOfCorrectAnswers: previousState.totalOfCorrectAnswers + 1,
        }))
    }

    onIncorrectPress = () => {
        this.setState((previousState) => ({
            currentIndexOfQuestions: previousState.currentIndexOfQuestions + 1,
        }))
    }

    restartQuiz = () => {
        this.setState({
            currentIndexOfQuestions: 0,
            totalOfCorrectAnswers: 0,
        })
    }

    goBack = () => {
        clearLocalNotification()
            .then(setLocalNotification);
        this.props.navigation.goBack();
    }

    switchQuestionView = () => {
        this.setState((previousState) => ({
            questionView: !previousState.questionView
        }))
    }

    render() {

        const { currentIndexOfQuestions, totalOfCorrectAnswers, questionView } = this.state
        const { title, questions } = this.props.navigation.state.params;

        return (
            questions.length > 0 ?
                <View style={{ flex: 1 }}>
                    {
                        (currentIndexOfQuestions > 0 && currentIndexOfQuestions === questions.length) ?
                            <QuizFinished
                                totalOfCorrectAnswers={totalOfCorrectAnswers}
                                restartQuiz={this.restartQuiz}
                                goBack={this.goBack}
                                questions={questions} />
                            :
                            (
                                <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                                    <View>
                                        <Text>{questions.length - currentIndexOfQuestions} / {questions.length}</Text>
                                    </View>
                                    {questionView ? (
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 24 }}>{questions[currentIndexOfQuestions].question}</Text>

                                            <TouchableOpacity onPress={this.switchQuestionView}>
                                                <Text style={{ fontSize: 20, color: 'red' }}>Answer</Text>
                                            </TouchableOpacity>

                                        </View>
                                    ) : (
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: 24 }}>{questions[currentIndexOfQuestions].answer}</Text>

                                                <TouchableOpacity onPress={this.switchQuestionView}>
                                                    <Text style={{ fontSize: 20, color: 'red' }}>Question</Text>
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                    <View style={{ alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
                                        <View style={{
                                            flex: 1,
                                            paddingTop: 20,
                                        }}>
                                            <TouchableOpacity onPress={this.onCorrectPress}
                                                style={[styles.button, { backgroundColor: 'green' }]}>
                                                <Text style={styles.buttonText}>Correct</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onIncorrectPress}
                                                style={[styles.button, { backgroundColor: 'red' }]}>
                                                <Text style={styles.buttonText}>Incorrect</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                    }
                </View> :
                <View style={{ justifyContent: 'flex-start', flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'red' }}>There are no cards in this deck !</Text>
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
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default StartQuiz
