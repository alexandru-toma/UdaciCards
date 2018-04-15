import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Deck from './Deck'

class IndividualDeck extends Component {
    componentWillMount() {
    }
 
    render() {
        const {title, questions} = this.props.navigation.state.params;

        return (
            <View style={styles.container}>     
                <Deck
                    title={title}
                    questions={questions}/>
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddNewCard', {title, questions})}>
                        <Text>
                           Add New Card
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('StartQuiz', {title, questions})}>
                        <Text>
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
});

export default IndividualDeck;
