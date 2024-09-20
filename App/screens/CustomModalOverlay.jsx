import React, { useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.4; // 모달의 높이를 화면 높이의 40%로 설정

const CustomModalOverlay = ({ isVisible, onClose, children }) => {
const slideAnim = useRef(new Animated.Value(MODAL_HEIGHT)).current;

useEffect(() => {
    Animated.timing(slideAnim, {
	toValue: isVisible ? 0 : MODAL_HEIGHT,
	duration: 300,
	useNativeDriver: true,
    }).start();
}, [isVisible]);

return (
    <View style={styles.container} pointerEvents="box-none">
	<Animated.View 
        style={[
		styles.modalContent,
		{ transform: [{ translateY: slideAnim }] }
        ]}
	>
        {children}
        <Button title="닫기" onPress={onClose} />
	</Animated.View>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: MODAL_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CustomModalOverlay;