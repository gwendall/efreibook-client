import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, Animated } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const Screen = () => {
	const [toggled, setToggled] = useState(false);
	const squareSize = 150 * (toggled ? 2 : 1);
	const animatedValue = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		const animation = Animated.timing(animatedValue, {
			toValue: toggled ? 1 : 0,
			duration: 200,
		})
		animation.start();
		return () => animation.stop();
	}, [toggled])
	const animatedStyle = {
		height: animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [150, 300],
		}),
		width: animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [150, 300],
		}),
		backgroundColor: animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['#1fad45', '#e3a02d'],
		}),
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<TouchableWithoutFeedback onPress={() => setToggled(!toggled)}>
					<Animated.View style={[{ backgroundColor: 'papayawhip' }, animatedStyle]} />
				</TouchableWithoutFeedback>
			</View>
		</SafeAreaView>
	)
}

Screen.navigationOptions = {
	title: 'Animations'
}

export default Screen;
