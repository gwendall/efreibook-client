import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USERS = gql`
  {
    users {
      id
      firstName
      lastName
    }
  }
`;

const Screen = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  return (
    <Container>
			{loading && <Text>{'Loading...'}</Text>}
			{error && <Text>{`Error! ${error.message}`}</Text>}
			{!loading && !error && (
				<Text>{JSON.stringify(data, null, 2)}</Text>
			)}
    </Container>
  );
}

export default Screen;

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`
