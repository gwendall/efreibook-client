import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const queries = {
  GET_USERS: gql`
    {
      users {
        lastName
      }
    }
  `,
  GET_USER: gql`
    query user($id: ID!) {
      user(id: $id) {
        id
        firstName
        lastName
      }
    }
  `,
  SEARCH_USER: gql`
    query xxx($q: String!) {
      search(q: $q) {
        id
        firstName
        lastName
      }
    }
  `
}

const Screen = () => {
  const [q, setQ] = useState('')
  const { loading, error, data } = useQuery(queries.SEARCH_USER, {
    variables: {
      q: q
    }
  });
  return (
    <>
    <Input
      value={q}
      onChangeText={v => setQ(v)}
      placeholder="Rechercher une personne..."
    />
    <ScrollView>
      <Container>
  			{loading && <Text>{'Loading...'}</Text>}
  			{error && <Text>{`Error! ${error.message}`}</Text>}
  			{!loading && !error && (
  				<Text>{JSON.stringify(data, null, 2)}</Text>
  			)}
      </Container>
    </ScrollView>
    </>
  );
}
Screen.navigationOptions = {
  title: 'Home'
}
export default Screen;

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`
const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  border-bottom-color: rgba(0, 0, 0, .1);
  border-bottom-width: ${StyleSheet.hairlineWidth};
  padding: 0 15px;
  background-color: rgba(0, 0, 0, .02)
`
