import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import fetch from 'unfetch'
import gql from 'graphql-tag'
import store from '../store'
import { onUpdateOrder } from './orders'

const cable = ActionCable.createConsumer(`//${window.location.host}/api/rt`)
const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError && networkError === 401) {
    console.error('User unauthorized!')
    store.logout()
  }
})

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const httpLink = new HttpLink({
  uri: '/api',
  credentials: 'include',
  fetch
})

const subscriptionLink = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
)

const link = ApolloLink.from([errorLink, subscriptionLink])

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
})
export { gql, client }
