import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '~/apollo/queries'
import * as mutations from '~/apollo/mutations'
import Input from '~/components/Input'
import Separator from '~/components/Separator'
import { Formik } from 'formik';
import * as Yup from 'yup';

const Screen = ({ navigation }) => {
	const userId = navigation.getParam('id')
	const { loading, error, data } = useQuery(queries.GET_USER, {
		variables: {
			id: userId
		}
	});
	const [editUser, {
		loading: mutationLoading,
		error: mutationError,
		data: mutationData
	}] = useMutation(mutations.EDIT_USER);
	const onSubmit = async ({ firstName, lastName }) => {
		await editUser({
			variables: {
				id: userId,
				data: {
					firstName,
					lastName
				}
			},
		});
		navigation.goBack()
	}
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('Le prénom est requis'),
		lastName: Yup.string().required('Le nom est requis'),
	})
	return (
		<Container>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				enableReinitialize={true}
				initialValues={data.user}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, errors, handleChange, setFieldValue, handleSubmit }) => (
					<>
						<Input
							placeholder="Prénom"
							value={values.firstName}
							error={errors.firstName}
							onChangeText={handleChange('firstName')}
						/>
						<Separator />
						<Input
							placeholder="Nom"
							value={values.lastName}
							error={errors.lastName}
							onChangeText={handleChange('lastName')}
						/>
						<Separator />
						<View style={{ height: 10 }} />
						<Button title={mutationLoading ? '...' : 'OK'} onPress={handleSubmit} disabled={mutationLoading} />
					</>
				)}
			</Formik>
		</Container>
	)
}
Screen.navigationOptions = {
  title: 'Éditer une personne'
}
export default Screen;

const Container = styled.View`
	align-items: center;
	justify-content: center;
`
