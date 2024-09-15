import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
	const cityMarkerImg = require("../assets/MapViewIcons/cityMarker.png")

	//현재 사용자의 위치를 구하는 함수 (지도를 켰을 때, uesEffect가 한번 실행 됨)
  const [presentLocation, setLocation] = useState(null);
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const locationResult = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(locationResult.coords);
      } else {
        console.log('Location permission not granted');
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {presentLocation ? (
				// 맵 뷰를 보여줌
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: presentLocation.latitude,
            longitude: presentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
				{/* 현재 위치에 마커를 띄움 */}
				<Marker
					coordinate={{
						latitude: presentLocation.latitude,
						longitude: presentLocation.longitude,
					}}
					title="현재 위치"
					description="여기에 있습니다"
					image={cityMarkerImg}
				/>
				</MapView>
      ) : (
        <Text>맵을 로딩 합니다...</Text>
      )}
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
