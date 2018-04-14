import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getDecks} from '../actions/index';
import {getAllDecks} from '../utils/api';
import Deck from './Deck';

class Decks extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        getAllDecks().then(decks => dispatch(getDecks(decks)))
            .then(() => this.setState(() => ({ready: true})));
    }

    renderItem = ({item}) => (
        <View style={styles.item}>        
                <Deck
                    title={item.title}
                    questions={item.questions}/>
        </View>
    );

    render() {
        return (
            <View style={styles.deck}>
                <FlatList
                    data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        height: Dimensions.get('window').height
    },
});

export default connect(mapStateToProps)(Decks);
