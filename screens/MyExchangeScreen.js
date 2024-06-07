import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import AppHeader from './AppHeader'
import firebase from 'firebase';
import db from '../config.js';
export default class MyExchange extends Component {
  static navigationOptions = { header: null };
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allExchanges:[],
      clientName: '',
    };
    this.requestRef = null;
  }
  componentDidMount() {
    this.getAllExchanges();
    this.getClientDetails(this.state.userId);
  }

  getClientDetails = (clientId) => {
    db.collection('users')
      .where('email_id', '==', clientId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            clientName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };
  sendNotification = (itemDetails, request_status) => {
    var requestId = itemDetails.request_id;
    var clientId = itemDetails.client_id;

    db.collection('all_notifications')
      .where('request_id', '==', requestId)
      .where('client_id', '==', clientId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = '';
          if (request_status == 'item Sent') {
            message = this.state.clientName + 'Sent You the the item';
          } else {
            message =
              this.state.clientName + 'has Shown interest in exchanging The item';
          }
          db.collection('all_notifications').doc(doc.id).update({
            message: message,
            notification_status: 'unread',
            date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  sendItem = (itemDetails) => {
    console.log('send Item Exicuted');
    if (itemDetails.request_status == 'item Sent') {
      var requestStatus1 = 'Client Intrested';
      db.collection('all_Exchanges').doc(itemDetails.doc_id).update({
        request_status: requestStatus1,
      });
      this.sendNotification(itemDetails, requestStatus1);
    } else {
      var requestStatus2 = 'item Sent';
      db.collection('all_Exchanges').doc(itemDetails.doc_id).update({
        request_status: requestStatus2,
      });
      this.sendNotification(itemDetails, requestStatus2);
    }
  };

  getAllExchanges = () => {
    this.requestRef = db
      .collection('all_exchanges')
      .where('client_id', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allExchanges = [];
        snapshot.docs.map((document) => {
          console.log(document.data());
          var exchange = document.data();
          exchange['doc_id'] = document.id;
          allExchanges.push(exchange);
          console.log(exchange);
        });
        this.setState({ allDonations: allExchanges });
        console.log(this.state.allDonations);
      });
  };
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.item_to_exchange}
      
      subtitle={
        'Requested By : ' +
        item.requested_by +
        '\nstatus : ' +
        item.request_status+
        'item to give:'+
        item.item_to_get

      }
      leftElement={<Icon name="item" type="font-awesome" color="#696969" />}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.request_status === 'item Sent' ? 'green' : '#ff5722',
            },
          ]}
          onPress={() => {
            this.sendItem(item);
          }}>
          <Text style={{ color: '#ffff' }}>
            {item.request_status === 'item Sent' ? 'item Sent' : 'Send item'}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );
  render() {
    return (
      <View>
       <AppHeader/>
        <View style={{ flex: 1 }}>
          {this.state.allExchanges.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 20 }}>List of all Exchanges</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allExchanges}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
