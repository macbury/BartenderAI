import { observable, action, flow } from 'mobx'
import { getAllRecipes, makeADrink, saveRecipe, getRecipe, deleteRecipe } from '../api/recipes'
import { getAllBottles } from '../api/bottles'
import arrayMove from 'array-move'

class Recipes {
  @observable collection = []
  @observable errors = []
  @observable loading = true
  @observable formData = null

  refresh = flow(function * () {
    this.loading = true
    const recipes = yield getAllRecipes()
    if (!!recipes) {
      this.collection = recipes
    }
    this.loading = false
  }.bind(this))

  @action.bound update(key, value) {
    this.formData[key] = value
  }

  @action.bound updatePrice(value) {
    this.formData.price.value = value
  }

  @action.bound updateProportion(bottleId, amount) {
    const { proportions } = this.formData

    this.formData.proportions = proportions.map((proportion) => {
      if (proportion.bottle.id === bottleId) {
        proportion.amount = parseInt(amount) || 0
      }
      return proportion
    })
  }

  @action.bound moveProportion(oldIndex, newIndex) {
    const { proportions } = this.formData
    let orderedProportions = proportions.slice().sort(({ position: a }, { position: b }) => a - b)
    orderedProportions = arrayMove(orderedProportions, oldIndex, newIndex).map((p, index) => {
      p.position = index
      return p
    })

    this.formData.proportions = orderedProportions
  }

  resetFormData = flow(function * () {
    this.loading = true
    this.errors = []
    const bottles = yield getAllBottles()
    this.formData = {
      name: 'New recipe',
      price: {
        value: 3.50,
        currency: 'EUR'
      },
      proportions: bottles.map((bottle, index) => { return { position: index, bottle, amount: 0 } })
    }
    this.loading = false
  }.bind(this))

  @action async makeADrink(recipeId) {
    return await makeADrink(recipeId)
  }

  save = flow(function * () {
    this.loading = true
    const { recipe, errors } = yield saveRecipe(this.formData)
    this.errors = errors
    this.loading = false
    return recipe
  }.bind(this))

  destroy = flow(function * (recipeId) {
    this.loading = true
    yield deleteRecipe(recipeId)
    this.errors = []
    this.collection = []
    this.loading = false
  }.bind(this))

  fetch = flow(function * (recipeId) {
    this.loading = true
    this.formData = yield getRecipe(recipeId)
    this.errors = []
    this.loading = false
  }.bind(this))
}

const recipes = new Recipes()
export default recipes
