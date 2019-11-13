import { client, gql } from './index'

export async function fetchPendingOrders() {
  const query = gql`
    {
      orders(status: Processed) {
        id
        paymentAddress
        status
        recipe {
          name
        }
        price {
          value
          currency
        }
      }
    }
  `

  try {
    const { data: { orders } } = await client.query({ query })
    return orders
  } catch (e) {
    console.error("Could not fetch processed orders", e)
  }
}

export async function updateOrder(attributes) {
  const mutation = gql`
    mutation($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
        errors
      }
    }
  `

  const variables = { input: attributes }

  try {
    const { data: { updateOrder: { errors } } } = await client.mutate({ mutation, variables })
    return errors
  } catch (e) {
    console.error("Could not fetch processed orders", e)
  }
}

export function onUpdateOrder() {
  const query = gql`
    subscription {
      onUpdateOrder {
        id
        paymentAddress
        status
        recipe {
          name
        }
        price {
          value
          currency
        }
      }
    }
  `

  return client.subscribe({ query })
}
