import React from 'react';
import {View} from 'react-native';
import Realm from 'realm';
import Mytext from '../components/Mytext';
import Mybutton from '../components/Mybutton';
import {useUser} from '@realm/react';

interface UserDetails {
  user_id: number;
  user_name: string;
  user_contact: string;
  user_address: string;
}

let realm: Realm;

// Initialize Realm App
const app = new Realm.App({id: 'y-coyjk'});

export default class HomeScreen extends React.Component {
  constructor(props: any) {
    super(props);
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: {type: 'int', default: 0},
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });
  }

  async createUserApiKey() {
    const user = useUser();
    const apiKey = await user?.apiKeys.create('mySecretKey');
    console.log('apiKey', apiKey);
  }

  // Log in user
  async login() {
    // const credentials = Realm.Credentials.anonymous();
    const apiKey = '62fc2b43-6f13-4430-881a-9cea35c27e3c';
    if (!apiKey) {
      throw new Error('Could not find a Server API Key.');
    }
    // Create an api key credential
    const credentials = Realm.Credentials.apiKey(apiKey);
    const user = await app.logIn(credentials);

    // const user = await app.logIn(credentials);
    console.log('user', user);

    return user;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mytext text="RealM Example" />
        <Mybutton title="Login" customClick={() => this.createUserApiKey()} />
        <Mybutton
          title="Register"
          customClick={() => this.props.navigation.navigate('Register')}
        />
        <Mybutton
          title="Update"
          customClick={() => this.props.navigation.navigate('Update')}
        />
        <Mybutton
          title="View"
          customClick={() => this.props.navigation.navigate('View')}
        />
        <Mybutton
          title="View All"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Delete"
          customClick={() => this.props.navigation.navigate('Delete')}
        />
      </View>
    );
  }
}
