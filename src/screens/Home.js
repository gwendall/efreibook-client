import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '~/apollo/queries'
import Input from '~/components/Input'
import Separator from '~/components/Separator'

const Screen = ({ navigation }) => {
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
    <Separator />
      <Container>
        {loading && <Text>{'Loading...'}</Text>}
        {error && <Text>{`Error! ${error.message}`}</Text>}
        {!loading && !error && (
          <FlatList
            data={data.search}
            renderItem={({ item: { id, firstName, lastName } }) => (
              <TouchableOpacity onPress={() => navigation.navigate('User', { id })}>
                <ListItem>
                  <Text>{[firstName, lastName].join(' ')}</Text>
                </ListItem>
              </TouchableOpacity>
            )}
            keyExtractor={({ id }) => id}
          />
        )}
      </Container>
    </>
  );
}
Screen.navigationOptions = {
  title: 'Accueil'
}
export default Screen;

const Container = styled.View`
	flex: 1;
`
const ListItem = styled.View`
  height: 60px;
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
`
