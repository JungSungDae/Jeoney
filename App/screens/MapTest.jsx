import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';  // Polyline 추가
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';  // Directions API 추가
import MapDataSample from '../Data/MapDataSample.json';

// 화면의 가로/세로 비율 계산
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default function App() {
  // 마커 이미지 설정
  const cityMarkerImg = require("../assets/MapViewIcons/cityMarker.png");
  const landmarkMarkerImg = require("../assets/MapViewIcons/landmarkMarker.png");

  // 상태 변수 정의
  const [presentLocation, setPresentLocation] = useState(null);  // 현재 위치
  const [selectedCity, setSelectedCity] = useState(null);  // 선택된 도시
  const [showLandmarks, setShowLandmarks] = useState(false);  // 명소 표시 여부
  const [isLoading, setIsLoading] = useState(false);  // 새로 추가: 로딩 상태
  const mapRef = useRef(null);  // MapView에 대한 참조

  // Google Maps API 키 설정 (환경 변수로 저장하는 것이 좋음)
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBnVeoo1KPt7cjYr8Sc2Cnc-9sGhQRwYFg';

  // 현재 위치를 가져오는 함수 (수정됨)
  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);  // 새로 추가: 로딩 시작
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return null;
      }
      
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,  // 새로 추가: 정확도를 Balanced로 조정
        timeout: 10000,  // 새로 추가: 10초 타임아웃 설정
      });
      return locationResult.coords;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    } finally {
      setIsLoading(false);  // 새로 추가: 로딩 종료
    }
  };

  // 컴포넌트 마운트 시 현재 위치 가져오기
  useEffect(() => {
    const getLocation = async () => {
      const location = await getCurrentLocation();
      if (location) {
        setPresentLocation(location);
      }
    };

    getLocation();
  }, []);

  // 현재 위치 재설정 함수 (수정됨)
  const resetCurrentLocation = async () => {
    const newLocation = await getCurrentLocation();
    if (newLocation) {
      setPresentLocation(newLocation);
      // 현재 위치로 지도 이동
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }
    }
  };

  // 선택된 도시와 명소를 모두 포함하는 지도 영역 계산
  const calculateRegion = (city) => {
    let minLat = Number.POSITIVE_INFINITY;
    let maxLat = Number.NEGATIVE_INFINITY;
    let minLng = Number.POSITIVE_INFINITY;
    let maxLng = Number.NEGATIVE_INFINITY;

    // 모든 명소의 좌표를 고려하여 최소/최대 위도와 경도 계산
    city.markedLandmarks.forEach(landmark => {
      minLat = Math.min(minLat, landmark.coordinate.latitude);
      maxLat = Math.max(maxLat, landmark.coordinate.latitude);
      minLng = Math.min(minLng, landmark.coordinate.longitude);
      maxLng = Math.max(maxLng, landmark.coordinate.longitude);
    });

    // 도시 자체의 좌표도 고려
    minLat = Math.min(minLat, city.coordinate.latitude);
    maxLat = Math.max(maxLat, city.coordinate.latitude);
    minLng = Math.min(minLng, city.coordinate.longitude);
    maxLng = Math.max(maxLng, city.coordinate.longitude);

    // 선택된 도시를 중앙에 배치
    const centerLat = city.coordinate.latitude;
    const centerLng = city.coordinate.longitude;

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
          latitude: city.coordinate.latitude,
          longitude: city.coordinate.longitude,
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
          latitude: landmark.coordinate.latitude,
          longitude: landmark.coordinate.longitude,
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
            />

            {/* 도시 및 명소 마커 */}
            {ShowMarkedCities()}
            {ShowMarkedLandmarks()}

            {/* 경로 표시: 서울 -> 현재 위치 */}
            <MapViewDirections
              origin={{
                latitude: MapDataSample.startSpots.seoul.coordinate.latitude,
                longitude: MapDataSample.startSpots.seoul.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              destination={{
                latitude: presentLocation.latitude,
                longitude: presentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
              mode="DRIVING" // 걷기, 자전거 등을 위해 'WALKING', 'BICYCLING' 모드도 가능
            />
          </MapView>
          {/* 선택 해제 버튼 */}
          {showLandmarks && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
          {/* 현재 위치 재설정 버튼 (수정됨) */}
          <TouchableOpacity 
            style={[styles.resetLocationButton, isLoading && styles.disabledButton]} 
            onPress={resetCurrentLocation}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.resetLocationButtonText}>📍</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>맵을 로딩 중입니다...</Text>
        </View>
      )}
    </View>
  );
}

// 스타일 정의 (수정 및 추가됨)
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
  resetLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  resetLocationButtonText: {
    fontSize: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});