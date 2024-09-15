import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function App() {
  const [routeInfo, setRouteInfo] = useState(null); // 경로 정보를 위한 상태 변수
  const [errorMsg, setErrorMsg] = useState(null); // 오류 메시지를 위한 상태 변수

  // 미국의 두 지점 (예: New York City와 Los Angeles)
  const origin = {
    latitude: 40.7128, // New York City의 위도
    longitude: -74.0060, // New York City의 경도
  };
  const destination = {
    latitude: 34.0522, // Los Angeles의 위도
    longitude: -118.2437, // Los Angeles의 경도
  };

  const GOOGLE_MAPS_API_KEY = 'AIzaSyDtJQpj4yQtxLnzZtuu2N9jLl98gcRhzxA';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker coordinate={origin} title="출발지: New York City" />
        <Marker coordinate={destination} title="도착지: Los Angeles" />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => {
            console.log("Route info:", result); // 경로 정보 콘솔에 출력
            setRouteInfo({
              distance: result.distance,
              duration: result.duration,
              coordinates: result.coordinates,
            }); // 상태에 경로 정보 저장
          }}
          onError={(errorMessage) => {
            console.log("Directions API error:", errorMessage); // 오류 콘솔에 출력
            setErrorMsg(errorMessage); // 오류 메시지 상태에 저장
          }}
        />
      </MapView>

      {routeInfo && ( // 경로 정보가 있을 때만 표시
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeInfoText}>거리: {routeInfo.distance} km</Text>
          <Text style={styles.routeInfoText}>소요 시간: {routeInfo.duration} min</Text>
        </View>
      )}

      {errorMsg && ( // 오류 메시지가 있을 때만 표시
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>오류 발생: {errorMsg}</Text>
        </View>
      )}
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  routeInfoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  routeInfoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
