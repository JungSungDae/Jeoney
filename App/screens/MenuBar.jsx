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
    position: 'absolute',  // 메뉴바를 절대 위치로 설정
    bottom: 0,  // 하단에 고정
    left: 0,  // 왼쪽에 고정
    right: 0,  // 오른쪽에 고정
    height: 70,  // 메뉴바 높이를 고정
    backgroundColor: '#ffffff',  // 배경색 설정
  },
  menuBar: {
    flexDirection: 'row',  // 가로로 나열
    justifyContent: 'space-around',  // 메뉴 간격
    alignItems: 'center',  // 세로로 중앙 정렬
    paddingVertical: 10,  // 패딩 설정
  },
  menuItem: {
    alignItems: 'center',  // 텍스트와 아이콘 가운데 정렬
  },
  icon: {
    width: 30,  // 아이콘 크기를 고정
    height: 30,  // 아이콘 크기를 고정
  },
  menuText: {
    fontSize: 12,
    color: '#000',
  },
});
