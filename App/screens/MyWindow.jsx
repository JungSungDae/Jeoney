import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

const MyWindow = () => {
  return (
    // ImageBackground 컴포넌트를 사용하여 배경 이미지 추가
    <ImageBackground 
      source={require('../assets/MyWindowIcon/MyWindowBackground.png')} // 배경 이미지 경로
      style={styles.background} 
      resizeMode="cover" // 배경 이미지가 화면에 꽉 차도록 설정
    />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // 배경이 화면 전체를 채우도록 설정
  },
});

export default MyWindow;
