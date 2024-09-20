import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'  
import Main from "./screens/Main";
import MapTest from "./screens/MapTest";
import MenuBar from "./screens/MainWindow";
import MissionFoodModal from "./screens/MyWindow";
import StartButtonWindow from "./screens/StartButtonWindow";

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
          options={{ headerShown: false }}  // MenuBar 화면 헤더 제거
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
          component={MapTest} 
          options={{ headerShown: false }}  // MapTest 화면 헤더 제거
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App; 
