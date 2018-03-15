import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import axios from 'axios';
import uuid from 'uuid';

export default class Root extends React.Component {

    static navigationOptions = {
        title: 'Lists',
    };

    constructor() {
        super();
        this.state = {
            lists:{},
            nameFilter: null,
            addingList: false
        };

        axios
            .get("http://narek-dev.com/react-native-api/")
            .then(response => {
                this.setState({lists: response.data});
            })
            .catch(error => {console.log(error);});
    }

    handleFilterTextChanged(text){
        this.setState({nameFilter: text});
    }

    handleAddListClick(){
        this.setState({addingList: true});
        //console.log(this.refs.addListInput);
    }

    handleAddListInputChanged(text){
        //this.setState({lists: {'eidjd8374': {'name': text}}});
        console.log(text);
    }

    render() { 
        const { navigate } = this.props.navigation;

        let lists = Object.keys(this.state.lists)
            .filter(listId => (!this.state.nameFilter || this.state.lists[listId].name.toLowerCase().startsWith(this.state.nameFilter.toLowerCase())) )
            .map(listId => {
                return (
                    <View key={listId}>
                        <Text 
                            onPress={() => navigate('List', this.state.lists[listId])} 
                            style={{fontSize: 30}}>
                            {this.state.lists[listId].name}
                        </Text>
                    </View>
                );
            });

        return (
            <View  style={{flex: 1}}>
                <View style={styles.container}>
                    {lists}
                    <TextInput 
                        style={{display: this.state.addingList ? 'flex' : 'none'}} 
                        placeholder="Add List"
                        ref="addListInput"
                        onSubmitEditing={this.handleAddListInputChanged.bind(this)}
                        />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Button title="Add List" onPress={this.handleAddListClick.bind(this)} color='green' style={{flexBasis: '50%'}} />
                    <TextInput onChangeText={this.handleFilterTextChanged.bind(this)} placeholder="Filter By Name" style={{flexBasis: '50%'}}></TextInput>
                </View>
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
