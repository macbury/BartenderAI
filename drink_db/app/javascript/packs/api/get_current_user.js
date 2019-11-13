import { client, gql } from './index'

export default async function getCurrentUser() {
  const query = gql`
    {
      currentUser {
        name
        accessToken
        id
      }
    }
  `

  try {
    const { data } = await client.query({ query })
    if (data) {
      const { currentUser } = data
      return currentUser
    } else {
      return null
    }
  } catch (e) {
    console.error("Could not fetch current user", e)
  }
}