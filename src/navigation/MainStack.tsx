import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/MainScreen/MainScreen'
import SelectPlayersScreen from '../screens/SelectPlayersScreen/SelectPlayersScreen'
import SelectGameTypeScreen from '../screens/SelectGameTypeScreen/SelectGameTypeScreen'
import SwitchTurnScreen from '../screens/SwitchTurnScreen/SwitchTurnScreen'
import GuessTheWordScreen from '../screens/GuessTheWordScreen/GuessTheWordScreen'
import FinalScoreScreen from '../screens/FinalScoreScreen/FinalScoreScreen'
import InstructionScreen from '../screens/InstructionScreen/InstructionScreen'
import AboutScreen from '../screens/AboutScreen/AboutScreen'

export type MainStackParamList = {
  Main: undefined
  Instruction: undefined
  About: undefined
  SelectPlayers: undefined
  SelectGameType: undefined
  SwitchTurn: { playerName: string; round: number; totalRounds: number }
  GuessTheWord: { playerName: string; round: number; totalRounds: number }
  FinalScore: { gameId: string }
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
        <Stack.Screen name="Instruction" component={InstructionScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="SelectPlayers" component={SelectPlayersScreen} />
        <Stack.Screen name="SelectGameType" component={SelectGameTypeScreen} />
        <Stack.Screen name="SwitchTurn" component={SwitchTurnScreen} />
        <Stack.Screen name="GuessTheWord" component={GuessTheWordScreen} />
        <Stack.Screen name="FinalScore" component={FinalScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
