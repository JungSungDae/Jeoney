import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MyWindow = () => {
  return (
    <View style={styles.container}>
      {/* 첫 번째 카드 이미지 */}
      <View style={styles.imageBox}>
        <Image 
          source={require('../assets/EventWindowIcons/Event 1.png')} // 첫 번째 이미지
          style={styles.image} 
          resizeMode="cover" 
        />
      </View>

      {/* 두 번째 카드 이미지 */}
      <View style={styles.imageBox}>
        <Image 
          source={require('../assets/EventWindowIcons/Event 2.png')} // 두 번째 이미지
          style={styles.image} 
          resizeMode="cover" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  imageBox: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', // 둥근 모서리
  },
  image: {
    width: '100%',
    height: 200, // 이미지 높이
  },
});

export default MyWindow;
