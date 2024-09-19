import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import mapData from '../Data/MapDataSample.json'; // MapDataSample.json 파일 import
import MenuBar from './MenuBar'; // MenuBar.jsx 파일 import

const { width, height } = Dimensions.get('window');

export default function App() {
  // 도시 마커 이미지와 랜드마크 마커 이미지 경로
  const cityMarkerImg = require("../assets/MapViewIcons/cityMarker.png");
  const landmarkMarkerImg = require("../assets/MapViewIcons/landmarkMarker.png"); // 랜드마크 마커 이미지 추가

  // 상태 변수 선언
  const [presentLocation, setPresentLocation] = useState(null); // 현재 위치
  const [startLocation, setStartLocation] = useState(null); // 시작 지점
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [cities, setCities] = useState([]); // 도시 리스트
  const [markers, setMarkers] = useState([]); // 마커 리스트
  const [showCities, setShowCities] = useState(false); // 도시 표시 여부
  const [showLandmarks, setShowLandmarks] = useState(false); // 랜드마크 표시 여부
  const [searchInput, setSearchInput] = useState(''); // 검색 입력값
  const [selectedCity, setSelectedCity] = useState(null); // 선택된 도시
  const [landmarks, setLandmarks] = useState([]); // 선택된 도시의 랜드마크 리스트
  const mapRef = useRef(null); // MapView 참조

  // 경로 탐색 여부를 확인하는 상태 추가
  const [isRouteSearched, setIsRouteSearched] = useState(false);

  // 구글 지도 API 키
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDtJQpj4yQtxLnzZtuu2N9jLl98gcRhzxA';
  // 전주로 고정된 도착 지점
  const destination = { latitude: 35.8242, longitude: 127.1480, name: "전주" };
  const numPoints = 10; // 선을 그릴 때 사용할 점의 수

  // 현재 위치를 가져오는 함수
  const getCurrentLocation = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission not granted');
        return null;
      }
      
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });
      return locationResult.coords;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 컴포넌트가 마운트될 때 현재 위치를 가져오는 useEffect
  useEffect(() => {
    const getLocation = async () => {
      const location = await getCurrentLocation();
      if (location) {
        setPresentLocation(location);
      }
    };

    getLocation();
  }, []);

  // 두 지점 사이를 보간하여 중간 점들을 생성하는 함수
  const interpolatePoints = (start, end, numPoints) => {
    if (!start || !end) return []; // 시작 또는 끝 지점이 없으면 빈 배열 반환
    let points = [];
    for (let i = 0; i <= numPoints; i++) {
      const latitude = start.latitude + (end.latitude - start.latitude) * (i / numPoints);
      const longitude = start.longitude + (end.longitude - start.longitude) * (i / numPoints);
      points.push({ latitude, longitude });
    }
    return points;
  };

  // 시작 위치와 도착 위치를 이용해 중간 점들을 계산
  const intermediatePoints = startLocation ? interpolatePoints(startLocation, destination, numPoints) : [];

  // 주어진 좌표에서 도시의 세부 정보를 가져오는 함수
  const getCityDetails = async (latitude, longitude) => {
    try {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}&language=ko`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results.length > 0) {
        const addressComponents = geocodeData.results[0].address_components;
        const city = addressComponents.find(component =>
          component.types.includes('locality') || component.types.includes('administrative_area_level_1')
        );
        const cityName = city ? city.long_name : 'Unknown city';

        const placesResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(cityName)}&inputtype=textquery&fields=formatted_address,name,geometry&key=${GOOGLE_MAPS_APIKEY}&language=ko`
        );
        const placesData = await placesResponse.json();

        if (placesData.candidates && placesData.candidates.length > 0) {
          const place = placesData.candidates[0];
          return {
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          };
        }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  // 선을 따라 도시를 찾는 함수
  const findCitiesAlongLine = async (points) => {
    setIsLoading(true); // 로딩 시작
    const citySet = new Set();
    const markerData = [];
    for (const point of points) {
      const cityDetails = await getCityDetails(point.latitude, point.longitude);
      if (cityDetails && cityDetails.name !== 'Unknown city') {
        if (!citySet.has(cityDetails.name)) { 
          citySet.add(cityDetails.name);
          markerData.push(cityDetails);
        }
      }
    }
    
    //시작 지점(사용자가 설정)과 끝 지점(전주)을 경유지로 설정하면 안되므로 제외함
    markerData.shift();
    markerData.pop();

    setCities(Array.from(citySet));
    setMarkers(markerData);
    setIsLoading(false); // 로딩 끝
  };

  // showCities나 startLocation이 변경되면 도시 찾기 작업 수행
  useEffect(() => {
    if (showCities && startLocation) {
      findCitiesAlongLine(intermediatePoints);
    }
  }, [showCities, startLocation]);

  // 도시 경계를 그리는 함수
  const drawCityBoundary = (city) => {
    const radius = 0.02;
    return [
      { latitude: city.latitude + radius, longitude: city.longitude + radius },
      { latitude: city.latitude + radius, longitude: city.longitude - radius },
      { latitude: city.latitude - radius, longitude: city.longitude - radius },
      { latitude: city.latitude - radius, longitude: city.longitude + radius },
    ];
  };

  // 도시 마커 클릭 시 랜드마크 표시 및 지도 이동
  const handleCityPress = (city) => {
    setSelectedCity(city);
    setShowLandmarks(true);
    
    // MapDataSample.json에서 선택된 도시의 랜드마크 찾기
    const selectedCityData = mapData.markedCities.find(c => c.name === city.name);
    if (selectedCityData) {
      setLandmarks(selectedCityData.markedLandmarks);
    } else {
      setLandmarks([]);
    }
    
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: city.latitude,
        longitude: city.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  // 선택 해제 함수
  const clearSelection = () => {
    setSelectedCity(null);
    setShowLandmarks(false);
    setLandmarks([]);
  };

  // 시작 지점을 설정하는 함수
  const handleSetStartPoint = async () => {
    // 기존 마커와 경로 초기화
    const location = await fetchLocationFromSearch(searchInput);

    // 입력 내용이 유효한지에 관한 예외처리
    if (!location){
      if (searchInput == ""){ //아무것도 입력을 하지 않았을 때
        alert("가고자 하는 지역을 입력해주세요")
      }
      else{ // 입력한 지역이 존재하지 않을 때
        alert("해당 지역 존재하지 않음")
      }
      return;
    }


    handleClear();
    
    if (location) {
      setStartLocation({
        ...location,
        name: searchInput // 시작 지점의 이름 저장
      });
      setSearchInput('');
      setShowCities(true);
      setIsRouteSearched(true); // 경로 탐색 완료 표시
    }
  };

  // 검색어로부터 위치를 가져오는 함수
  const fetchLocationFromSearch = async (query) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_APIKEY}&language=ko`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { geometry } = data.results[0];
        return {
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
        };
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  // 모든 경유지와 선을 지우는 함수
  const handleClear = () => {
    setStartLocation(null);
    setShowCities(false);
    setMarkers([]);
    setCities([]);
    clearSelection();
    setIsRouteSearched(false); // 경로 탐색 상태 초기화
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
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
            showsUserLocation={true} // 사용자의 현재 위치를 표시
            showsMyLocationButton={true} // 현재 위치로 이동하는 버튼 표시
          >
            {/* 시작 지점 마커 */}
            {startLocation && (
              <Marker 
                coordinate={startLocation} 
                title="시작 지점"
                pinColor="green" // 시작 지점을 구분하기 위해 색상 변경
              />
            )}
            {/* 고정 도착 지점 마커 */}
            <Marker 
              coordinate={destination} 
              title={destination.name}
              pinColor="red" // 도착 지점을 구분하기 위해 색상 변경
            />

            {/* 시작 지점과 도착 지점 사이의 선 */}
            {startLocation && (
              <Polyline
                coordinates={[startLocation, destination]}
                strokeColor="#000"
                strokeWidth={3}
              />
            )}

            {/* 경유 도시 마커들 */}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                image={cityMarkerImg}
                onPress={() => handleCityPress(marker)}
              />
            ))}
            {/* 선택된 도시의 경계를 그리는 코드 */}
            {/* {selectedCity && (
              <Polygon
                coordinates={drawCityBoundary(selectedCity)}
                strokeColor="rgba(0,0,255,0.7)"
                fillColor="rgba(0,0,255,0.3)"
                strokeWidth={2}
              />
            )} */}
            {/* 랜드마크 마커 추가 */}
            {showLandmarks && landmarks.map((landmark, index) => (
              <Marker
                key={`landmark-${index}`}
                coordinate={{
                  latitude: landmark.coordinate.latitude,
                  longitude: landmark.coordinate.longitude
                }}
                title={landmark.name}
                image={landmarkMarkerImg}
              />
            ))}
          </MapView>

          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.searchContainer}
          >
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                value={searchInput}
                onChangeText={setSearchInput}
                placeholder="시작 지점 검색"
              />
              <Button title="설정" onPress={handleSetStartPoint} />
            </View>
          </KeyboardAvoidingView>

          {isRouteSearched && (
            <View style={styles.bottomControls}>
              {showLandmarks && <Button title="랜드마크 닫기" onPress={clearSelection} />}
              <Button title="모두 지우기" onPress={handleClear} />
            </View>
          )}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {/* {MenuBar 추가} */}
      <MenuBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    width: width,
    height: height - 120,
  },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 76,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});


