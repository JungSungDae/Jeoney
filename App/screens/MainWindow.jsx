import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import MenuBar from './MenuBar';

const { width, height } = Dimensions.get('window'); // 현재 기기의 화면 크기를 가져옴

const MainWindow = ({navigation}) => {
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
            source={require('../assets/MainWindowIcon/Profile.png')}
          />
        </TouchableOpacity>
      </View>

      {/* 중앙 축제 버튼 */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handlePress('축제')}>
          <Image
            style={styles.mainImage}
            source={require('../assets/MainWindowIcon/FestivalPicture.png')}
            resizeMode="contain"
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
              source={require('../assets/MainWindowIcon/Weather.png')}
            />
          </TouchableOpacity>
        </View>

        {/* 오른쪽 이벤트와 스토어 버튼 */}
        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={() => navigation.navigate('EventWindow')}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/MainWindowIcon/Event.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("StoreWindow")}>
            <Image
              style={styles.buttonIcon}
              source={require('../assets/MainWindowIcon/Store.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* MenuBar를 하단에 고정 */}
      <MenuBar navigation={navigation}/>
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
    marginBottom: 0,
    alignItems: 'center',
    marginTop: height * 0, // 화면 높이에 따라 조정
  },
  profileIcon: {
    width: width * 0.9,  // 기기 너비의 90%에 해당하는 크기로 조정
    height: width * 0.4, // 기기 너비의 40%를 높이로 설정
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.14,  // 화면 높이에 따라 축제 이미지 위치 조정
  },
  mainImage: {
    width: '110%',  // 너비의 110% 차지
    height: undefined,
    aspectRatio: 1, // 정사각형 비율 유지
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * -0.1,  // 화면 높이에 따라 위로 조정
    marginBottom: height * 0.1,  // 화면 높이에 따라 버튼들 위치 조정
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
    width: width * 0.45,  // 기기 너비의 45%에 해당하는 크기
    height: height * 0.1,  // 기기 높이의 10%에 해당하는 크기
    marginBottom: height * 0.015,  // 기기 높이에 따라 이벤트와 스토어 사이 간격 조정
  },
  w_buttonIcon: {
    width: width * 0.425,  // 기기 너비의 42.5%에 해당하는 크기
    height: width * 0.425,  // 기기 너비의 42.5%에 해당하는 높이
  },
});

export default MainWindow;
