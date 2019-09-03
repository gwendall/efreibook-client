import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';
import * as colors from '~/constants/colors'

const TextInput = styled.TextInput`
  height: 50px;
  width: 100%;
  padding: 0 15px;
`

const ErrorView = styled(Animated.View)`
  height: 0;
`

const TextInputContainer = styled(Animated.View)`
  width: 100%;
`

const ErrorText = styled.Text`
  color: ${colors.error};
  margin-top: 5px;
`

export default ({ error, ...props }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		const animation = Animated.timing(animatedValue, {
			toValue: error ? 1 : 0,
			duration: 200,
		})
		animation.start();
		return () => animation.stop();
	}, [error])
	const animatedContainerStyle = {
		backgroundColor: animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [colors.border, 'white'],
		})
	}
  const animatedErrorStyle = {
    opacity: animatedValue,
		height: animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 40],
		}),
	}
  return <>
    <TextInputContainer style={[animatedContainerStyle]}>
      <TextInput {...props} />
    </TextInputContainer>
    <ErrorView style={animatedErrorStyle}>
      <ErrorText>{error}</ErrorText>
    </ErrorView>
  </>
}
