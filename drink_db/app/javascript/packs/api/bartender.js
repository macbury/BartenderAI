import { client, gql } from './index'

export async function getBartender() {
  const query = gql`
    {
      currentBartender {
        status
        ip
        enablePayment
      }
    }
  `

  try {
    const { data: { currentBartender } } = await client.query({ query })
    return currentBartender
  } catch (e) {
    console.error("Could not fetch currentBartender", e)
  }
}

export async function saveBartender({ enablePayment }) {
  const mutation = gql`
    mutation($input: UpdateBartenderInput!) {
      updateBartender(input: $input) {
        errors
      }
    }
  `

  const input = { enablePayment }

  try {
    const { data: { updateBartender: { errors } } } = await client.mutate({ mutation, variables: { input } })
    return errors
  } catch (e) {
    console.error("Could not update bartender", e)
  }
}