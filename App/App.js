import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'  
import Main from "./screens/Main";
import MapView from "./screens/MapView";
import MenuBar from "./screens/MainWindow";
import MissionFoodModal from "./screens/MyWindow";
import StartButtonWindow from "./screens/StartButtonWindow";
import MainWindow from "./screens/MainWindow";
import MyWindow from "./screens/MyWindow";
import CrewWindow from "./screens/CrewWindow";

const Stack = createStackNavigator();

 const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {/* 모든 화면에서 headerShown: false 적용 */}
        <Stack.Screen 
          name="Main" 
          component={Main} 
          options={{ headerShown: false }}  // Main 화면 헤더 제거
        />
        <Stack.Screen 
          name="MenuBar" 
          component={MenuBar} 
          options={{ headerShown: false }}  // MainWindow 화면 헤더 제거
        />
        <Stack.Screen 
          name="MissionFoodModal" 
          component={MissionFoodModal} 
          options={{ headerShown: false }}  // MissionFoodModal 화면 헤더 제거
        />
        <Stack.Screen 
          name="StartButtonWindow" 
          component={StartButtonWindow} 
          options={{ headerShown: false }}  // StartButtonWindow 화면 헤더 제거
        />
        <Stack.Screen 
          name="MapView" 
          component={MapView} 
          options={{ headerShown: false }}  // MapView 화면 헤더 제거
        />
        <Stack.Screen 
          name="MainWindow" 
          component={MainWindow} 
          options={{ headerShown: false }}  // MainWindow 화면 헤더 제거
        />
        <Stack.Screen 
          name="MyWindow" 
          component={MyWindow} 
          options={{ headerShown: false }}  // MyWindow 화면 헤더 제거
        />
        <Stack.Screen 
          name="CrewWindow" 
          component={CrewWindow} 
          options={{ headerShown: false }}  // MyWindow 화면 헤더 제거
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App; 
