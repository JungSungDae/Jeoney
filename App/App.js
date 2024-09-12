import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapApi from "./screens/MapAPI";
import Main from "./screens/Main";
import MenuBar from "./screens/MenuBar";
import MissionFoodModal from "./screens/MissionFoodModal";
import StartButtonWindow from "./screens/StartButtonWindow";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MapApi" component={MapApi} />
        <Stack.Screen name="MenuBar" component={MenuBar} />
        <Stack.Screen name="MissionFoodModal" component={MissionFoodModal} />
        <Stack.Screen name="StartButtonWindow" component={StartButtonWindow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
