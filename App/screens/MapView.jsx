import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapDataSample from '../Data/MapDataSample.json';

// 화면의 가로/세로 비율 계산
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default function App() {
  // 마커 이미지 설정
  const cityMarkerImg = require("../assets/MapViewIcons/cityMarker.png");
  const landmarkMarkerImg = require("../assets/MapViewIcons/landmarkMarker.png");

  // 상태 변수 정의
  const [presentLocation, setLocation] = useState(null);  // 현재 위치
  const [selectedCity, setSelectedCity] = useState(null);  // 선택된 도시
  const [showLandmarks, setShowLandmarks] = useState(false);  // 명소 표시 여부
  const mapRef = useRef(null);  // MapView에 대한 참조

  // 컴포넌트 마운트 시 현재 위치 가져오기
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

  // 선택된 도시와 명소를 모두 포함하는 지도 영역 계산
  const calculateRegion = (city) => {
    let minLat = Number.POSITIVE_INFINITY;
    let maxLat = Number.NEGATIVE_INFINITY;
    let minLng = Number.POSITIVE_INFINITY;
    let maxLng = Number.NEGATIVE_INFINITY;

    // 모든 명소의 좌표를 고려하여 최소/최대 위도와 경도 계산
    city.markedLandmarks.forEach(landmark => {
      minLat = Math.min(minLat, landmark.coodinate.latitude);
      maxLat = Math.max(maxLat, landmark.coodinate.latitude);
      minLng = Math.min(minLng, landmark.coodinate.longitude);
      maxLng = Math.max(maxLng, landmark.coodinate.longitude);
    });

    // 도시 자체의 좌표도 고려
    minLat = Math.min(minLat, city.coodinate.latitude);
    maxLat = Math.max(maxLat, city.coodinate.latitude);
    minLng = Math.min(minLng, city.coodinate.longitude);
    maxLng = Math.max(maxLng, city.coodinate.longitude);

    // 선택된 도시를 중앙에 배치
    const centerLat = city.coodinate.latitude;
    const centerLng = city.coodinate.longitude;

    // 위도와 경도의 델타 값 계산 (여유 공간을 위해 1.5배 확장)
    const latDelta = Math.max((maxLat - minLat) * 1.5, 0.02);
    const lngDelta = Math.max((maxLng - minLng) * 1.5, 0.02);

    // 화면 비율을 고려하여 최종 델타 값 조정
    const finalLngDelta = Math.max(lngDelta, latDelta * ASPECT_RATIO);
    const finalLatDelta = Math.max(latDelta, lngDelta / ASPECT_RATIO);

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: finalLatDelta,
      longitudeDelta: finalLngDelta,
    };
  };

  // 도시 선택 시 호출되는 함수
  const handleCityPress = (city) => {
    setSelectedCity(city);
    setShowLandmarks(true);
    
    const region = calculateRegion(city);
    
    // 선택된 도시로 지도 이동 및 확대/축소
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);  // 1000ms 동안 애니메이션
    }
  };

  // 선택 해제 시 호출되는 함수
  const clearSelection = () => {
    setSelectedCity(null);
    setShowLandmarks(false);
    
    // 초기 위치로 지도 이동
    // if (mapRef.current && presentLocation) {
    //   mapRef.current.animateToRegion({
    //     latitude: presentLocation.latitude,
    //     longitude: presentLocation.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   }, 1000);
    // }
  };

  // 도시 마커 렌더링 함수
  const ShowMarkedCities = () => {
    return MapDataSample.markedCities.map((city, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: city.coodinate.latitude,
          longitude: city.coodinate.longitude,
        }}
        title={`${city.name}`}
        description="경유지"
        image={cityMarkerImg}
        onPress={() => handleCityPress(city)}
      />
    ));
  };

  // 명소 마커 렌더링 함수
  const ShowMarkedLandmarks = () => {
    if (!selectedCity || !showLandmarks) return null;
    return selectedCity.markedLandmarks.map((landmark, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: landmark.coodinate.latitude,
          longitude: landmark.coodinate.longitude,
        }}
        title={`${landmark.name}`}
        description="대충 명소지"
        image={landmarkMarkerImg}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {presentLocation ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: presentLocation.latitude,
              longitude: presentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* 현재 위치 마커 */}
            <Marker
              coordinate={{
                latitude: presentLocation.latitude,
                longitude: presentLocation.longitude,
              }}
              title="현재 위치"
              description="여기에 있습니다"
              image={cityMarkerImg}
            />

            {/* 도시 및 명소 마커 */}
            {ShowMarkedCities()}
            {ShowMarkedLandmarks()}
          </MapView>
          {/* 선택 해제 버튼 */}
          {showLandmarks && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>맵을 로딩 합니다...</Text>
      )}
    </View>
  );
}

// 스타일 정의
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
  clearButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});