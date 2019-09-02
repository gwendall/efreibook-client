import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import RootNavigator from './src/navigator';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000',
});

const App = () => (
  <ApolloProvider client={client}>
    <RootNavigator />
  </ApolloProvider>
)

export default App
