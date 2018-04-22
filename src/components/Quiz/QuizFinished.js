import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const QuizFinished = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Your total score</Text>
                <Text style={styles.scorePrecentage}>{(props.totalOfCorrectAnswers / props.questions.length).toFixed(2) * 100}
                    %</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
                <TouchableOpacity onPress={props.restartQuiz}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Re-start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.goBack}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Back to Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 18
    },
    scoreContainer: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreLabel: {
        fontSize: 26,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scorePrecentage: {
        fontSize: 34,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center'
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
})

export default QuizFinished