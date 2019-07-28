import { client, gql } from './index'

export async function saveRecipe({ id, name, price: { value: price }, proportions }) {
  const createRecipeMutation = gql`
    mutation($recipe: CreateRecipeInput!) {
      result: createRecipe(input: $recipe) {
        recipe {
          id
        }

        errors
      }
    }
  `

  const updateRecipeMutation = gql`
    mutation($recipe: UpdateRecipeInput!) {
      result: updateRecipe(input: $recipe) {
        recipe {
          id
        }

        errors
      }
    }
  `

  const recipeProportions = proportions.map(({ bottle: { id: bottleId }, amount, position, id }) => {
    return { bottleId, amount, position, id }
  })

  try {
    const recipe = {
      id,
      name,
      price: parseFloat(price),
      proportions: recipeProportions
    }

    const mutation = id ? updateRecipeMutation : createRecipeMutation

    const { data: { result } } = await client.mutate({ mutation, variables: { recipe } })
    return result
  } catch (e) {
    console.error("Could not save recipe", e)
  }
}

export async function getAllRecipes() {
  const query = gql`
    {
      recipes {
        id
        name
        preparationTime
        totalVolume
        price {
          value
          currency
        }

        proportions {
          id
          amount
          bottle {
            id
            content
          }
        }
      }
    }
  `

  try {
    const { data: { recipes } } = await client.query({ query })
    return recipes
  } catch (e) {
    console.error("Could not fetch recipes", e)
  }
}

export async function getRecipe(recipeId) {
  const query = gql`
    query($recipeId: ID!) {
      recipe(id: $recipeId) {
        id
        name
        price {
          value
          currency
        }
        proportions(withContent: false) {
          id
          amount
          position
          bottle {
            id
            content
          }
        }
      }
    }
  `

  try {
    const { data: { recipe } } = await client.query({ query, variables: { recipeId } })
    return recipe
  } catch (e) {
    console.error("Could not fetch recipe", e)
  }
}


export async function makeADrink(recipeId) {
  const mutation = gql`
    mutation($recipeId: String!) {
      makeADrink(input: { name: $recipeId }) {
        order {
          id
        }
        errors
      }
    }
  `
  try {
    const { data: { makeADrink: { order, errors } } } = await client.mutate({ mutation, variables: { recipeId: recipeId.toString() } })
    return errors
  } catch (e) {
    console.error("Could not make a drink", e)
  }
}

export async function deleteRecipe(recipeId) {
  const mutation = gql`
    mutation($recipeId: ID!) {
      deleteRecipe(input: { id: $recipeId }) {
        recipe {
          id
        }
        errors
      }
    }
  `
  try {
    const { data: { deleteRecipe: { errors } } } = await client.mutate({ mutation, variables: { recipeId: recipeId.toString() } })
    return errors
  } catch (e) {
    console.error("Could not delete recipe", e)
  }
}
