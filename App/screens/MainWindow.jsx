import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderWidth : 5
  },
  topBar: {
    marginBottom: 30, //프로필 축제 버튼 사이 간격
    alignItems: 'center',
  },
  profileIcon: {
    width: 400,
    height: 90,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  mainImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingHorizontal: 0, // 왼쪽과 오른쪽 버튼 간격 추가
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
    marginTop: 0, // 이벤트와 스토어 간 간격 추가
  },
  buttonIcon: {
    width: 160,
    height: 70,
    marginBottom: 20, // 이벤트와 스토어 사이 간격 조정
  },
  w_buttonIcon: {
    width: 150,
    height: 150,
    marginBottom: 0,
  },
});

export default MainWindow;
