import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { Notifications } from 'expo'
// import DeviceInfo from 'react-native-device-info'
import { useMutation } from '@apollo/react-hooks';
import * as mutations from '~/apollo/mutations'

const Screen = () => {
	const [permissionStatus, setPermissionStatus] = useState(null);
	useEffect(() => {
		Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status, expires, permissions }) => {
			setPermissionStatus(status)
		})
	}, [])
	const askNotificationsPermission = () => {
		Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status, expires, permissions, ...other }) => {
			console.log('Permission ?', { status, expires, permissions, other })
			setPermissionStatus(status)
		})
	}

	// Set expo token
	const [expoToken, setExpoToken] = useState('ExponentPushToken[blmmZaLG3Zmd3JOv9uFdyc]')
	useEffect(() => {
		try {
			if (permissionStatus === 'granted') {
				Notifications.getExpoPushTokenAsync().then(token => {
					setExpoToken(token)
				})
			}
		} catch(err) {
			console.log('Error.')
		}
	}, [permissionStatus])

	// Trigger mutation on expo token change
	const [storeUserExpoToken, {
		loading: mutationLoading,
		error: mutationError,
		data: mutationData
	}] = useMutation(mutations.STORE_USER_EXPO_TOKEN);
	useEffect(() => {
		storeUserExpoToken({ variables: {
			token: expoToken
		}})
	}, [expoToken])
	const [sendNotification] = useMutation(mutations.SEND_NOTIFICATION);
	const onPressSend = () => {
		sendNotification({
			variables: {
				token: expoToken
			}
		})
	}
	return (
		<SafeAreaView>
			<Text>{`Permission status : ${permissionStatus}`}</Text>
			{permissionStatus === 'undetermined' && (
				<Button title="Donner la permission" onPress={askNotificationsPermission} />
			)}
			{permissionStatus === 'granted' && (
				<Button title="Envoyer une notification" onPress={onPressSend} />
			)}
		</SafeAreaView>
	)
}
// ExponentPushToken[blmmZaLG3Zmd3JOv9uFdyc]
Screen.navigationOptions = {
	title: 'Notifications'
}

export default Screen;

Notifications.addListener(({ origin, data }) => {
	if (origin === 'received') {
		console.log('Notification received whilst app was open.')
	} else if (origin === 'selected') {
		console.log('Notification clicked from outside.')
	}
})
