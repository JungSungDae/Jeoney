import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default function App() {
	return (
		<View style={styles.container}>
		<MapView
			style={styles.map}
			initialRegion={{
			latitude: 35.849522,
			longitude: 127.111735,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
			}}
		/>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
