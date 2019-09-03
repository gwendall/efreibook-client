import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '~/apollo/queries'
import Input from '~/components/Input'
import Separator from '~/components/Separator'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const Screen = ({ navigation }) => {
	const cameraRef = useRef(null)
	const [photo, setPhoto] = useState(null)
	const [permissionStatus, setPermissionStatus] = useState(null)
	useEffect(() => {
		Permissions.getAsync(Permissions.CAMERA).then(({ status, expires, permissions }) => {
			setPermissionStatus(status)
		})
	}, [])
	const askPermission = async () => {
		const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
		setPermissionStatus(status)
	}
	const takePicture = async () => {
		if (cameraRef && cameraRef.current) {
			let photo = await cameraRef.current.takePictureAsync();
			setPhoto(photo.uri)
		}
	}
	const cancelPicture = () => setPhoto(null)
  return (
    <Container>
			<View style={{ padding: 15 }}>
				<Text style={{ textAlign: 'center' }}>{`Permission : ${permissionStatus}`}</Text>
			</View>
			{permissionStatus === 'undetermined' && (
				<Button title="Demander la permission" onPress={askPermission} />
			)}
			{permissionStatus === 'granted' && !photo && (
				<Camera ref={cameraRef} style={{ flex: 1 }} type={Camera.Constants.Type.back}>
					<View
						style={{
							flex: 1,
							backgroundColor: 'transparent',
							flexDirection: 'row',
						}}
					/>
					<Button title="Prendre une photo" onPress={takePicture} />
				</Camera>
			)}
			{permissionStatus === 'granted' && !!photo && (
				<>
					<Image style={{ flex: 1 }} source={{ uri: photo }} />
					<View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
						<Button title="Annuler" onPress={cancelPicture} />
					</View>
				</>
			)}
			{permissionStatus === 'denied' && (
				<Button title="Permission denied" onPress={() => Linking.openURL('app-settings:')} />
			)}
    </Container>
  );
}
Screen.navigationOptions = {
  title: 'Camera'
}
export default Screen;

const Container = styled.View`
	flex: 1;
`;

const Button = ({ title, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={{ height: 40, paddingVertical: 0, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
			<Text style={{ color: 'white' }}>{title}</Text>
		</View>
	</TouchableOpacity>
)
