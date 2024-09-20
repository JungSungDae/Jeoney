import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import MenuBar from './MenuBar';

const EventWindow = ({navigation}) => {
  return (
    <View style={{flex : 1}}>
      {/* // ImageBackground 컴포넌트를 사용하여 배경 이미지 추가 */}
      <ImageBackground 
        source={require('../assets/EventWindowIcons/EventIcon.png')} // 배경 이미지 경로
        style={styles.background} 
        resizeMode="cover" // 배경 이미지가 화면에 꽉 차도록 설정
      />
      <MenuBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // 배경이 화면 전체를 채우도록 설정
  },
});

export default EventWindow;
