import React from 'react'
import { observer, inject } from 'mobx-react'
import Loader from '../components/loader'
import RecipeForm from '../components/recipe_form'

@inject(({
  recipes: { 
    formData, 
    loading, 
    fetch, 
    update, 
    moveProportion, 
    updatePrice, 
    save,
    errors,
    makeADrink,
    destroy
  },
}) => {
  return {
    formData,
    loading,
    fetch,
    update,
    moveProportion,
    updatePrice,
    save,
    errors,
    makeADrink,
    destroy
  }
})
@observer
export default class EditRecipePage extends React.Component {
  componentDidMount() {
    const { match: { params: { recipeId } } } = this.props
    this.props.fetch(recipeId)
  }

  onMakeADrink = async (e) => {
    e.preventDefault()
    const { makeADrink, formData: { id: recipeId } } = this.props
    const errors = await makeADrink(recipeId)
    if (errors.length > 0) {
      alert(errors.join(', '))  
    }
  }

  onDestroy = async (e) => {
    e.preventDefault()
    const { destroy, formData: { id: recipeId, name }, history } = this.props
    if (confirm(`Are you really want to delete ${name} recipe`)) {
      await destroy(recipeId)
      history.push(`/recipes`)
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { save, formData } = this.props
    await save(formData)
  }

  render() {
    const { loading, formData, errors, update, moveProportion, updatePrice } = this.props

    if (loading || formData == null) {
      return <Loader />
    }

    return (
      <div className="form-container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <RecipeForm recipe={formData}
                        onMakeADrink={this.onMakeADrink}
                        errors={errors}
                        onSubmit={this.onSubmit}
                        onNameChange={update}
                        onDestroy={this.onDestroy}
                        onPriceChange={updatePrice}
                        onMove={moveProportion} />
          </div>
        </div>
      </div>
    )
  }
}
