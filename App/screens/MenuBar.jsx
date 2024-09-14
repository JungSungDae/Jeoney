import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function MenuBar() {
  return (
    <View style={styles.container}>
      <View style={styles.menuBar}>
        <View style={styles.menuItem}>
          { <Image source={require('../assets/MenuIcons/main.png')} style={styles.icon} /> }
          <Text style={styles.menuText}>메인</Text>
        </View>

        <View style={styles.menuItem}>
          { <Image source={require('../assets/MenuIcons/map.png')} style={styles.icon} /> }
          <Text style={styles.menuText}>지도</Text>
        </View>

        <View style={styles.menuItem}>
          { <Image source={require('../assets/MenuIcons/crew.png')} style={styles.icon} /> }
          <Text style={styles.menuText}>크루</Text>
        </View>

        <View style={styles.menuItem}>
          { <Image source={require('../assets/MenuIcons/my.png')} style={styles.icon} /> }
          <Text style={styles.menuText}>마이</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // 화면 전체를 차지, 비율 기반 레이아웃 설정
    justifyContent: 'flex-end',  // 하단에 메뉴바를 배치
  },
  menuBar: {
    flexDirection: 'row',  // 가로로 나열
    justifyContent: 'space-around',  // 메뉴 간격
    backgroundColor: '#ffffff',
    paddingVertical: '2%',  // padding을 비율로 설정
    height: '10%',  // 메뉴바 높이를 화면의 10%로 설정
    // 변경된 부분: position 속성 대신 height 비율로 설정
  },
  menuItem: {
    alignItems: 'center',  // 텍스트와 아이콘 가운데 정렬
  },
  icon: {
    width: 30,  // 아이콘 크기를 고정
    height: 30,  // 아이콘 크기를 고정
    // width: '30%',  // 아이콘 크기를 비율로 설정
    // height: undefined,  // width에 맞춰 비율 자동 설정
    // aspectRatio: 1,  // 정사각형 비율 유지
    marginBottom: '5%',  // 여백을 비율로 설정
  },
  menuText: {
    fontSize: 12,
    color: '#000',
  },
});