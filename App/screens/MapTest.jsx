import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

export default function App() {
  const markerImg = require("../assets/MapViewIcons/marker.png");
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBnVeoo1KPt7cjYr8Sc2Cnc-9sGhQRwYFg';

  const [presentLocation, setLocation] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 35.814995, 
    longitude: 127.123293,
  });

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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: presentLocation.latitude,
            longitude: presentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: presentLocation.latitude,
              longitude: presentLocation.longitude,
            }}
            title="현재 위치"
            description="여기에 있습니다"
            image={markerImg}
          />
          <Marker
            coordinate={destination}
            title="목적지"
            description="도착지점입니다"
            image={markerImg}
          />
          <MapViewDirections
            origin={presentLocation}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onError={(errorMessage) => {
              console.log('Error fetching directions:', errorMessage);
            }}
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
