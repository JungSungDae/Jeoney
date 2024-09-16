import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import MenuBar from './MenuBar';

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* 버튼들이 표시되는 콘텐츠 영역 */}
      <View style={styles.content}>
        <Button 
          title="go to MapView" 
          onPress={() => navigation.navigate('MapView')}
        />
        <Text>---------------</Text>
        <Button 
          title="go to MenuBar" 
          onPress={() => navigation.navigate('MenuBar')}
        />
        <Text>---------------</Text>
        <Button 
          title="go to MissionFoodModal" 
          onPress={() => navigation.navigate('MissionFoodModal')}
        />
        <Text>---------------</Text>
        <Button 
          title="go to StartButtonWindow" 
          onPress={() => navigation.navigate('StartButtonWindow')}
        />
      </View>

      {/* MenuBar를 하단에 고정 */}
      <MenuBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 콘텐츠 영역을 중앙에 배치
    backgroundColor: '#fff',
  },
  content: {
    flex: 1, // 남은 공간을 차지
    justifyContent: 'center', // 중앙에 정렬
    alignItems: 'center',
    paddingBottom: 80, // 메뉴바 공간만큼 여유를 둠
  },
});
