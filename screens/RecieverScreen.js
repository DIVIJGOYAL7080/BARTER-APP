import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Header, Icon, Card } from 'react-native-elements';
import db from '../config';
import MyExchanges from './MyExchangeScreen';

export default class RecieverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam('details')['user_id'],
      requestId: this.props.navigation.getParam('details')['request_id'],
      itemName: this.props.navigation.getParam('details')['item_to_exchange'],
      reasonForExchanging: this.props.navigation.getParam('details')[
        'reason_to_exchange'
      ],
      itemToGet: this.props.navigation.getParam('details')['item_to_get'],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      recieverRequestDocId: '',
    };
  }

  getRecieverDetails() {
    db.collection('users')
      .where('email_id', '==', this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address,
          });
        });
      });

    db.collection('requested_Exchange')
      .where('request_id', '==', this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ recieverRequestDocId: doc.id });
        });
      });
  }

  updateItemStatus = () => {
    db.collection('all_donations').add({
      item_to_exchange: this.state.itemName,
      item_to_get: this.state.itemToGet,
      request_id: this.state.requestId,
      requested_by: this.state.recieverName,
      client_id: this.state.userId,
      request_status: 'client Interested',
    });
  };
  addNotification = () => {
    var message =
      this.state.userName + 'has shown interest in donating the book';
    db.collection('all_notifications').add({
      targeted_user_id: this.state.recieverId,
      client_id: this.state.userId,
      request_id: this.state.requestId,
      item_name: this.state.itemName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  componentDidMount() {
    this.getRecieverDetails();
  }

  render() {
    return (
      <View style={styles.container}>
    
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'exchange items',
              style: { color: '#90A5A9', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="#eaf8fe"
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={'item Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name : {this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Reason : {this.state.reasonForExchanging}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={'Reciever Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name: {this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Contact: {this.state.recieverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Address: {this.state.recieverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.recieverId !== this.state.userId ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateItemStatus();
                this.addNotification();
                this.props.navigation.navigate('MyExchanges');
              }}>
              <Text> I want to exchange </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
