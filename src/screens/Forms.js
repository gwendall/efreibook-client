import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Screen = () => {
	const [value, setValue] = useState('');
	const INITIAL_VALUES = {
		email: 'foo@bar.com',
		firstName: 'foo',
		lastName: 'bar'
	}
	useEffect(() => {
		setTimeout(() => {
			console.log('Reinitializing values !')
			setInitialValues(INITIAL_VALUES)
		}, 1000)
	}, [])
	const [initialValues, setInitialValues] = useState({})
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text style={styles.bigText}>{'Forms'}</Text>
			<Formik
				enableReinitialize={true}
				initialValues={initialValues}
				validationSchema={
					Yup.object().shape({
						email: Yup.string()
							.required('Entrez votre email.')
							.email('Entrez un email valide.'),
						firstName: Yup.string().required(),
						lastName: Yup.string().required(),
					})
				}
				onSubmit={values => console.log(values)}
				validateOnChange={false}
				validateOnBlur={false}
			>
				{props => (
					<>
						<TextInput
							onChangeText={v => props.setFieldValue('email', v)}
							value={props.values.email}
							placeholder="Enter your email"
							style={styles.bigText}
						/>
						<TextInput
							onChangeText={v => props.setFieldValue('firstName', v)}
							value={props.values.firstName}
							placeholder="Enter your first name"
							style={styles.bigText}
						/>
						<TextInput
							onChangeText={v => props.setFieldValue('lastName', v)}
							value={props.values.lastName}
							placeholder="Enter your last name"
							style={styles.bigText}
						/>
						<View style={{ flexDirection: 'row', height: 100 }}>
							{[1, 2, 3].map(v => (
								<TouchableOpacity key={`item.${v}`} onPress={() => props.setFieldValue('select', v)}>
									<View style={{ width: 50,height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
										<Text style={{ color: props.values.select === v ? 'red' : 'black' }}>{v}</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
						<Button title="Submit" onPress={props.handleSubmit} />
						<Text style={styles.bigText}>{JSON.stringify(props.values, null, 2)}</Text>
						<Text style={styles.bigText}>{JSON.stringify(props.errors, null, 2)}</Text>
					</>
				)}
			</Formik>
			<Text style={styles.bigText}>{`State value : ${value}`}</Text>
			<Text style={styles.bigText}>{JSON.stringify(initialValues, null, 2)}</Text>
		</SafeAreaView>
	)
}

Screen.navigationOptions = {
	title: 'Forms'
}

export default Screen;

const styles = {
	bigText: {
		fontSize: 30
	}
}
