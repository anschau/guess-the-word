import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen/MainScreen'
import SelectPlayersScreen from '../screens/SelectPlayersScreen/SelectPlayersScreen'

export type MainStackParamList = {
  Main: undefined
  SelectPlayers: undefined
}

const Stack = createStackNavigator<MainStackParamList>()

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
