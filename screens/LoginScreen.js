import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet,Alert,KeyboardAvoidingView,TouchableOpacity,Modal,ScrollView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../screens/AppHeader'
import RequestExchange from '../screens/RequestExchange.js';
import ExchangeRequests from '../screens/ExchangeRequests';
import { RFValue } from "react-native-responsive-fontsize";
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailID: 'divijg2007@gmail.com',
      password: 'iamdivij',
    };
  }

  //function userLogin is used to check the authenticated email id and password of the user
  userLogin = (emailID, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailID, password)
      .then(() => {
        this.goToRequestExchange()
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
      
  };


  //userSingUp function is used to check if the given password and email id is in correct format or not

  

 goToSignUp=()=>{

this.props.navigation.navigate('SignUp')

}
goToRequestExchange=()=>{

  this.props.navigation.navigate('RequestExchange')
}

  render() {
    return (
        <View>
        
      <View>
      <AppHeader/>
      </View>
      <View>
        <TextInput
          style={styles.loginbox}
          placeholder="divijg2007@gmail.com"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              emailID: text,
            });
          }}
        />
        
          <TextInput
            style={styles.loginbox}
            placeholder="iamdivij"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <Text 
        onPress={() => this.goToSignUp()}> Create an account?SIGNUP</Text>
     
         <View>
          <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
          onPress={()=>{this.userLogin(this.state.emailID ,this.state.password)}}>
            <Text style={{textAlign:'center'}}>Login</Text>
          </TouchableOpacity>

        </View>
        </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginbox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 keyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})
