import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import Realm from 'realm';

interface UserDetails {
  user_id: number;
  user_name: string;
  user_contact: string;
  user_address: string;
}

let realm: Realm;

export default class UpdateUserScreen extends React.Component {
  state: UserDetails;

  constructor(props: any) {
    super(props);
    realm = new Realm({path: 'UserDatabase.realm'});
    this.state = {
      input_user_id: '',
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }

  searchUser = () => {
    const {input_user_id} = this.state;
    console.log(this.state.input_user_id);
    var user_details = realm
      .objects<UserDetails>('user_details')
      .filtered('user_id =' + input_user_id);
    console.log(user_details);
    if (user_details.length > 0) {
      this.setState({
        user_name: user_details[0].user_name,
        user_contact: user_details[0].user_contact,
        user_address: user_details[0].user_address,
      });
    } else {
      Alert.alert('No user found');
      this.setState({
        user_name: '',
        user_contact: '',
        user_address: '',
      });
    }
  };

  updateUser = () => {
    const {input_user_id, user_name, user_contact, user_address} = this.state;
    if (input_user_id && user_name && user_contact && user_address) {
      realm.write(() => {
        const obj = realm
          .objects<UserDetails>('user_details')
          .filtered('user_id =' + input_user_id);
        if (obj.length > 0) {
          obj[0].user_name = user_name;
          obj[0].user_contact = user_contact;
          obj[0].user_address = user_address;
          Alert.alert(
            'Success',
            'User updated successfully',
            [
              {
                text: 'Ok',
                onPress: () => this.props.navigation.navigate('Home'),
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert('User Updation Failed');
        }
      });
    } else {
      Alert.alert('Please fill all fields');
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
              placeholder="Enter User Id"
              onChangeText={(input_user_id: any) =>
                this.setState({input_user_id})
              }
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              onChangeText={(user_name: any) => this.setState({user_name})}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={this.state.user_contact}
              onChangeText={(user_contact: any) =>
                this.setState({user_contact})
              }
              maxLength={10}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
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
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
