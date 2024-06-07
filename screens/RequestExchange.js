  import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet,Alert,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../screens/AppHeader'

export default class RequestExchange extends Component {
 constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      itemToExchange:"",
      reasonToExchange:"",
      itemToGet:""
    }
  }
createUniqueId(){
  return Math.random().toString(36).substring(7)
  
}
  addRequest=(itemToExchange,reasonToExchange,itemToGet)=>
  {
    var userId=this.state.userId
    var randomRequestId=this.createUniqueId()
    db.collection('requested_Exchange').add({
    "user_Id":userId,
    "item_to_exchange":itemToExchange,
    "reason_to_Exchange":reasonToExchange,
    "request_id":randomRequestId,
    "item_to_get":itemToGet
    })
    this.setState({
     itemToExchange:'',
      reasonToExchange:'',
      itemToGet:''

    })
    return Alert.alert("book requested succesfully")
  }
render(){

 return (
      <View>
       
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
        <AppHeader/>
          <TextInput
            style={styles.formTextInput}
            placeholder={'enter item to exchange'}
            onChangeText={(text) => {
              this.setState({ itemToExchange: text });
            }}
            value={this.state.itemToExchange}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            multiline
            numberOfLines={8}
            placeholder={'what is the reason to exchange the item'}
            onChangeText={(text) => {
              this.setState({
                reasonToExchange: text,
              });
            }}
            value={this.state.reasonToExchange}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.itemToExchange, this.state.reasonToExchange,this.state.itemToGet);
            }}>
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
}
}
const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
