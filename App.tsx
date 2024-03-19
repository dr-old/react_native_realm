/*Example of RealM Database in React Native*/

//Import external files
import HomeScreen from './src/pages/HomeScreen';
import RegisterUserScreen from './src/pages/RegisterUserScreen';
import UpdateUserScreen from './src/pages/UpdateUserScreen';
import ViewUserScreen from './src/pages/ViewUserScreen';
import ViewAllUserScreen from './src/pages/ViewAllUserScreen';
import DeleteUserScreen from './src/pages/DeleteUserScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const page = [
  {name: 'Home', comp: HomeScreen},
  {name: 'View', comp: ViewUserScreen},
  {name: 'ViewAll', comp: ViewAllUserScreen},
  {name: 'Update', comp: UpdateUserScreen},
  {name: 'Register', comp: RegisterUserScreen},
  {name: 'Delete', comp: DeleteUserScreen},
];
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          gestureEnabled: true,
        }}>
        {page.map((item, index) => (
          <Stack.Screen key={index} name={item.name} component={item.comp} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
