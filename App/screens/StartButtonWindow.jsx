import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import MenuBar from './MenuBar'; // MenuBar 컴포넌트 가져오기

export default function MapAPI() {
  return (
    // 배경 이미지를 ImageBackground로 설정
    <ImageBackground 
      source={require('../assets/StartButtonIcons/StartWindowBackground.png')} // 배경 이미지 추가
      style={styles.backgroundImage} // 스타일 적용
    >
      <View style={styles.container}>
        
        {/* 상단 버튼 */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/StartButtonIcons/SoloStart.png')} // 상단 버튼에 로컬 이미지 추가
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* 하단 버튼 */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/StartButtonIcons/CrewStart.png')} // 하단 버튼에 로컬 이미지 추가
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* MenuBar 컴포넌트 추가 */}
        <MenuBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // 배경 이미지가 화면에 꽉 차도록 설정
  },
  container: {
    flex: 1,
    justifyContent: 'center', // 버튼들을 세로로 가운데 정렬
    alignItems: 'center',
    paddingBottom: 50, // MenuBar를 위해 여백 추가
  },
  button: {
    width: 'auto', // 버튼의 가로 크기 비율 조절
    height: 280, // 버튼의 세로 크기 조절
    backgroundColor: 'transparent', // 버튼 배경 투명하게 설정
    justifyContent: 'center', // 버튼 내부 콘텐츠 수직 가운데 정렬
    alignItems: 'center', // 버튼 내부 콘텐츠 가로 가운데 정렬
    marginBottom: 40, // 버튼 간 간격
    borderRadius: 10, // 버튼의 모서리를 둥글게 처리
  },
  buttonImage: {
    width: 360, // 버튼 내 이미지 가로 크기
    height: 360, // 버튼 내 이미지 세로 크기
  },
});
