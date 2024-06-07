import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet,Alert,KeyboardAvoidingView,TouchableOpacity,Modal,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../screens/AppHeader'
export default class SignUp extends Component {
constructor() {
    super();
    this.state = {
      emailId : '',
      password: '',
      isModalVisible:true,
      firstname:'',
      lastname:'',
      address:'',
      contact:'',
      confirmPassword:''
    };
  }
    userSignUp = (emailId, password) =>{
   
       if(password !== this.state.confirmPassword){
          return Alert.alert("password doesn't match\nCheck your password.") }
          else{
    
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      db.collection('users').add({
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        contact:this.state.contact,
        email_id:this.state.emailId,
        password:this.state.password,
        address:this.state.address

      })
      return Alert.alert( 'User Added Successfully', '', [ {
        text: 'OK',
         onPress: () => this.setState({"isModalVisible" : false})}, ] );
          }) 
          .catch((error)=> {
             // Handle Errors here.
              var errorCode = error.code;
               var errorMessage = error.message; 
               return Alert.alert(errorMessage) });
                } }
              
             
     showModal=()=>{
return(
  <Modal
animationType="fade"
transparent={true}
visible={this.state.isModalVisible}>
<View style={styles.modalContainer}>
<ScrollView style={{width:'100%'}}>
<KeyboardAvoidingView style={styles.keyboardAvoidingView}>
<Text
style={styles.modalTitle}>
REGISTRATION
</Text>
<TextInput
style={styles.formTextInput}
placeholder={'FIRSTNAME'}
maxLength={8}
onChangeText={(text)=>{this.setState({
  firstname:text
})}}
/>
<TextInput
style={styles.formTextInput}
placeholder={'LASTNAME'}
maxLength={8}
onChangeText={(text)=>{this.setState({
  lastname:text
})}}
/>

<TextInput
 style={styles.formTextInput}
  placeholder ={"Address"} 
  multiline = {true}
   onChangeText={(text)=>{ this.setState({ address: text }) }} />
   
   <TextInput
    style={styles.formTextInput}
     placeholder ={"contact"}
     keyboardType={"numeric"}
     maxLength={10}
       onChangeText={(text)=>{ this.setState({contact:text }) }} />

       <TextInput
style={styles.formTextInput}
placeholder={'abc@mail.com'}
keyboardType ={'email-address'}
onChangeText={(text)=>{this.setState({
  emailId:text
})}}
/>

       <TextInput
style={styles.formTextInput}
placeholder={'password'}
keyboardType ={'email-address'}
onChangeText={(text)=>{this.setState({
  password:text
})}}
/>
<TextInput
style={styles.formTextInput}
placeholder={'confirm password'}
keyboardType ={'email-address'}
onChangeText={(text)=>{this.setState({
  confirmPassword:text
})}}
/>
 <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
       <View>
        <Text 
        style={{marginTop:10}}
        onPress={() => this.goToLogin()}> Already have an account?LOGIN</Text>
     </View>
     
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}   
     goToLogin=()=>{

this.props.navigation.navigate('LoginScreen')

}
  render(){

return(
  <View>
<View>
<AppHeader/>
</View>
  <View style={{justifyContent:'center', alignItems:'center'}}>
      {
        this.showModal()
      }
      </View>
 
         
</View>

)
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
 loginBox:{
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
