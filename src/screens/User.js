import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '~/apollo/queries'
import * as mutations from '~/apollo/mutations'
import Input from '~/components/Input'
import Separator from '~/components/Separator'

const Screen = ({ navigation }) => {
	const userId = navigation.getParam('id')
	const { loading, error, data } = useQuery(queries.GET_USER, {
		variables: {
			id: userId
		}
	});
	const [firstName, setFirstName] = useState(null)
	const [lastName, setLastName] = useState(null)
	const [editUser, {
		loading: mutationLoading,
		error: mutationError,
		data: mutationData
	}] = useMutation(mutations.EDIT_USER);
	useEffect(() => {
		if (data && data.user) {
			setFirstName(data.user.firstName)
			setLastName(data.user.lastName)
		}
	}, [data])
	const handleSubmit = async () => {
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
	return (
		<Container>
			<Input placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
			<Separator />
			<Input placeholder="Nom" value={lastName} onChangeText={setLastName} />
			<Separator />
			<View style={{ height: 10 }} />
			<Button title={mutationLoading ? '...' : 'OK'} onPress={handleSubmit} disabled={mutationLoading} />
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
