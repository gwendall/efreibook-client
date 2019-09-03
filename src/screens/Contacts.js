import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Linking } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

const Screen = () => {
	const [permissionStatus, setPermissionStatus] = useState(null);
	useEffect(() => {
		Permissions.getAsync(Permissions.CONTACTS).then(({ status, expires, permissions }) => {
			setPermissionStatus(status)
		})
	}, [])
	const askContactPermission = () => {
		Permissions.askAsync(Permissions.CONTACTS).then(({ status, expires, permissions }) => {
			setPermissionStatus(status)
		})
	}
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		if (permissionStatus === 'granted') {
			Contacts.getContactsAsync({
			  fields: [
					Contacts.Fields.ID,
					Contacts.Fields.Name,
					Contacts.Fields.Emails,
					Contacts.Fields.PhoneNumbers,
				],
			}).then(({ data }) => {
				setContacts(data);
			});
		}
	}, [permissionStatus])
	const goToSettings = () => Linking.openURL('app-settings:')
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>{`Permission status : ${permissionStatus}`}</Text>
			{permissionStatus === 'denied' && (
				<>
					<Text>{"Vous avez refusé l'accès à vos contacts."}</Text>
					<Button title={"Changer d'avis"} onPress={goToSettings} />
				</>
			)}
			{permissionStatus === 'undetermined' && (
				<>
					<Text>{"Veuillez nous donner accès à vos contacts pour [...]."}</Text>
					<Button title={'OK'} onPress={askContactPermission} />
				</>
			)}
			{permissionStatus === 'granted' && (
				<FlatList
					data={contacts}
					renderItem={({ item: { name } }) => (
						<View>
							<Text>{name}</Text>
						</View>
					)}
					keyExtractor={({ id }) => id}
				/>
			)}
		</SafeAreaView>
	)
}
Screen.navigationOptions = {
	title: 'Contacts'
}

export default Screen;
