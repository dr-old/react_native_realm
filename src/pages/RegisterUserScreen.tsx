import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Realm from 'realm';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';

interface State {
  user_name: string;
  user_contact: string;
  user_address: string;
}

let realm: Realm;

export default class RegisterUserScreen extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
    };
    realm = new Realm({path: 'UserDatabase.realm'});
  }

  register_user = () => {
    const {user_name, user_contact, user_address} = this.state;
    if (user_name && user_contact && user_address) {
      realm.write(() => {
        const ID =
          realm.objects('user_details').sorted('user_id', true).length > 0
            ? realm.objects('user_details').sorted('user_id', true)[0].user_id +
              1
            : 1;
        realm.create('user_details', {
          user_id: ID,
          user_name: user_name,
          user_contact: user_contact,
          user_address: user_address,
        });
        Alert.alert(
          'Success',
          'You are registered successfully',
          [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.navigate('Home'),
            },
          ],
          {cancelable: false},
        );
      });
    } else {
      if (!user_name) {
        Alert.alert('Please fill Name');
      } else if (!user_contact) {
        Alert.alert('Please fill Contact Number');
      } else if (!user_address) {
        Alert.alert('Please fill Address');
      }
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'space-between'}}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={(user_name: any) => this.setState({user_name})}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={(user_contact: any) =>
                this.setState({user_contact})
              }
              maxLength={10}
              keyboardType="numeric"
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={(user_address: any) =>
                this.setState({user_address})
              }
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical: 'top'}}
            />
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
