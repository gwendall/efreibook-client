import gql from 'graphql-tag';

export const GET_USERS = gql`
  {
    users {
      lastName
    }
  }
`

export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`


export const SEARCH_USER = gql`
  query xxx($q: String!) {
    search(q: $q) {
      id
      firstName
      lastName
    }
  }
`
