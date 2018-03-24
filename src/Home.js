import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import axios from 'axios';
//import uuid from 'uuid';
const uuidv = require('uuid/v4');

export default class Root extends React.Component {

    static navigationOptions = {
        title: 'Lists',
    };

    apiUrl = 'http://narek-dev.com/react-native-api?';

    constructor() {
        super();
        this.state = {
            lists:{},
            nameFilter: null,
            addingList: false,
            newListName: ''
        };

        axios
            .get(this.apiUrl + "operation=getall")
            .then(response => {
                console.log(response.data);
                this.setState({lists: response.data});
            })
            .catch(error => {console.log(error);});
    }

    handleFilterTextChanged(text){
        this.setState({nameFilter: text});
    }

    handleAddListClick(){
        this.setState({addingList: true});
    }

    handleAddListInputChanged(){
        try{
            console.log(this.state.newListName);
            var newListName = this.state.newListName;
            this.setState((prevState, props) => {
                var uuid = uuidv();
                prevState.lists.uuid={name: newListName, items: {}};
                prevState.addingList = false;
                return prevState;
            });
        }
        catch(error){
            console.log(error);
        }
        
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
                        onChangeText={(text) => this.setState({newListName: text})}
                        />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight onPress={this.handleAddListClick.bind(this)} style={{flexBasis: '50%'}}>
                        <Text>AddList</Text>
                    </TouchableHighlight>
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
