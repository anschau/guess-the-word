import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen/MainScreen';

export type MainStackParamList = {
  Main: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
