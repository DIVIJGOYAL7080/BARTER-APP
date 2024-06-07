import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase';

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userId: firebase.auth().currentUser.email
    };
  }
  componentDidMount(){
    this.getNumberOfUnreadNotifications()
  }
  getNumberOfUnreadNotifications=()=>{
    db.collection('all_notifications').where('notification_status', '==', 'unread').where('targeted_user_id','==',this.state.userId).onSnapshot((snapshot)=>{
      var unreadNotification = snapshot.docs.map((doc)=>{
       doc.data();
      })
      this.setState({
        value: unreadNotification.length
      })
    })
  }
  
  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awosome"
          color="#696969"
          onPress={() => {
            this.props.navigation.navigate('MyNofications');
          }}
        />
        <Badge
        value={this.state.value}
        containerStyle={{position: 'absolute', top: -4, right: -4}}
         />
      </View>
    );
  };
  render() {
    return (
 <View style={{backgroundColor:"orange"}}>
      <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',padding:20,color:'white'}}>Barter App</Text>
      
      </View>
    )
  }
}