import { client, gql } from './index'

export async function getAllBottles() {
  const query = gql`
    {
      bottles {
        id
        content
        color
        flowRate
        liquidLeft
        location
        size
        startupDelay
      }
    }
  `

  try {
    const { data: { bottles } } = await client.query({ query })
    return bottles
  } catch (e) {
    console.error("Could not fetch all bottles", e)
  }
}

export async function updateBottle(bottle) {
  const mutation = gql`
    mutation($id: ID!, $content: String, $color: String, $flowRate: Int, $size: Int, $startupDelay: Float) {
      updateBottle(input: { id: $id, content: $content, color: $color, flowRate: $flowRate, size: $size, startupDelay: $startupDelay }) {
        errors
      }
    }
  `
  try {
    const { data: { updateBottle: { errors } } } = await client.mutate({ mutation, variables: bottle })
    return errors
  } catch (e) {
    console.error("Could not update bottle", e)
  }
}


export async function refillBottle(bottleId) {
  const mutation = gql`
    mutation($bottleId: String!) {
      refillBottle(input: { content: $bottleId }) {
        errors
      }
    }
  `
  try {
    const { data: { refillBottle: { errors } } } = await client.mutate({ mutation, variables: { bottleId: bottleId.toString() } })
    return errors
  } catch (e) {
    console.error("Could not update bottle", e)
  }
}
