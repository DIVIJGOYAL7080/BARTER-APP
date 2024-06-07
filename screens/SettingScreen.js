import React,{Component} from 'react'
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native'
    import db from '../config';
import firebase from 'firebase';
import AppHeader from './AppHeader'

export default class SettingScreen extends Component{
  constructor(){
    super()
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:''
    }
  }
  getUserDetails=()=>{
  var email=firebase.auth().currentUser.email
  db.collection('users').wher('email_id',''== email).get()
  .then(snapshot => { snapshot.forEach(doc => {
     var data = doc.data()
   this.setState({
      emailId : data.email_id,
       firstName : data.first_name,
        lastName : data.last_name, 
        address : data.address,
         contact : data.contact,
          docId : doc.id 
          })
  })
  })
  }
  
  updateUserDetails=() => {
db.collection('users').doc(this.state.docId)
.update({
"first_name":this.state.firstName,
"last_name":this.state.lastName,
"contact":this.state.contact,
"address":this.state.address

})

  }

render() {
    return (
      <View style={styles.container}>
        <AppHeader/>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={'first name'}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'last name'}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
            value={this.state.lastName}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'contact'}
            maxLength={8}
            keyboardType={'numeric'}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'address'}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            value={this.state.address}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  formContainer: { flex: 1, width: '100%', alignItems: 'center' },
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: { fontSize: 25, fontWeight: 'bold', color: '#fff' },
});
