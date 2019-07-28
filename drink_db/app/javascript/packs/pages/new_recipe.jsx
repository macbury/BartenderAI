import React from 'react'
import { observer, inject } from 'mobx-react'
import Loader from '../components/loader'
import RecipeForm from '../components/recipe_form'

@inject(({
  recipes: { 
    formData, 
    loading, 
    resetFormData, 
    update, 
    moveProportion, 
    updatePrice, 
    save,
    errors
  },
}) => {
  return {
    formData,
    loading,
    resetFormData,
    update,
    moveProportion,
    updatePrice,
    save,
    errors
  }
})
@observer
export default class NewRecipePage extends React.Component {
  componentDidMount() {
    this.props.resetFormData()
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { save, history } = this.props
    const recipe = await save()

    if (recipe) {
      history.push(`/recipes/${recipe.id}`)
    }
  }

  render() {
    const { formData, loading, update, moveProportion, updatePrice, errors } = this.props

    if (loading || formData == null) {
      return <Loader />
    }

    return (
      <div className="form-container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <RecipeForm recipe={formData}
                        errors={errors}
                        onSubmit={this.onSubmit}
                        onNameChange={update}
                        onPriceChange={updatePrice}
                        onMove={moveProportion} />
          </div>
        </div>
      </div>
    )
  }
}
