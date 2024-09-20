import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import MenuBar from './MenuBar';

const MainWindow = () => {
  // 버튼 클릭 핸들러
  const handlePress = (buttonName) => {
    Alert.alert(`${buttonName} 버튼이 클릭되었습니다.`);
  };

  return (
    <View style={styles.container}>

      {/* 상단 프로필 버튼 */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => handlePress('프로필')}>
          <Image
            style={styles.profileIcon}
            source={require('../assets/MainWindowIcon/Profile.png')} // 프로필 이미지 추가
          />
        </TouchableOpacity>
      </View>

      {/* 중앙 축제 버튼 */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('축제')}>
          <Image
            style={styles.mainImage}
            source={require('../assets/MainWindowIcon/FestivalPicture.png')} // 축제 이미지 추가
            resizeMode="contain" // 이미지가 화면에 꽉 차도록 설정
          />
        </TouchableOpacity>
      </View>

      {/* 하단 버튼 그룹 */}
      <View style={styles.buttonGroup}>
        {/* 왼쪽 날씨 버튼 */}
        <View style={styles.leftColumn}>
          <TouchableOpacity onPress={() => handlePress('날씨')}>
            <Image
              style={styles.w_buttonIcon}
              source={require('../assets/MainWindowIcon/Weather.png')} // 날씨 이미지 추가
            />
          </TouchableOpacity>
        </View>

        {/* 오른쪽 이벤트와 스토어 버튼 */}
        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={() => handlePress('이벤트')}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/MainWindowIcon/Event.png')} // 이벤트 이미지 추가
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('스토어')}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/MainWindowIcon/Store.png')} // 스토어 이미지 추가
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* MenuBar를 하단에 고정 */}
      <MenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    marginBottom: 0, // 프로필과 축제 버튼 사이 간격을 줄임
    alignItems: 'center',
    marginTop: '-25%', // 상단에서 더 가까워지도록
  },
  profileIcon: {
    width: 380,  // 적절한 크기로 조정
    height: 380, // 적절한 크기로 조정
    resizeMode: 'contain',  // 이미지를 버튼에 맞게 조정
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '28%',  // 축제 이미지가 더 위로 오도록 조정
  },
  mainImage: {
    width: '115%',
    height: undefined,
    aspectRatio: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%',
    marginBottom: '20%', // 버튼들이 더 위로 오게 조정
  },
  leftColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  rightColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  buttonIcon: {
    width: 190,
    height: 80,
    marginBottom: '7%', // 이벤트와 스토어 사이 간격 조정
  },
  w_buttonIcon: {
    width: 170,
    height: 170,
  },
});

export default MainWindow;
