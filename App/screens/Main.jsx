import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button 
        title="go to MapApi" 
        onPress={() => navigation.navigate('MapApi')}
      >
      </Button>
      <Text>---------------</Text>
      <Button 
        title="go to MenuBar" 
        onPress={() => navigation.navigate('MenuBar')}
        >
      </Button>
      <Text>---------------</Text>
      <Button 
        title="go to MissionFoodModal" 
        onPress={() => navigation.navigate('MissionFoodModal')}
        >
      </Button>
          <Text>---------------</Text>
      <Button 
        title="go to StartButtonWindow" 
        onPress={() => navigation.navigate('StartButtonWindow')}
      >
      </Button>
    </View>
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