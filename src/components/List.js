import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class List extends React.Component {

    static navigationOptions = {
        title: 'List',
    };

    render() {
        const { params } = this.props.navigation.state;
        //console.log(params);
        let listItems = Object.keys(params.items).map(
            itemId => <Text key={itemId} style={{color: 'green'}}>{params.items[itemId].name}</Text>
        );
        
        return (
            <View style={styles.container}>
                <Text>{params.name}</Text>
                {listItems}
            </View>
        );
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