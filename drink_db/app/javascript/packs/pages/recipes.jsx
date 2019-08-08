import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import Loader from '../components/loader'
import Recipe from '../components/recipe'

@inject(({ recipes: { collection, refresh, loading, makeADrink } }) => {
  return { recipes: collection, refresh, loading, makeADrink }
})
@observer
export default class RecipesPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }

  render() {
    const { loading, recipes, makeADrink } = this.props

    if (loading && recipes.length == 0) {
      return <Loader />
    }

    return (
      <div>
        <div className="d-flex flex-row align-content-start flex-wrap">
          {recipes.map((recipe) => <Recipe makeADrink={makeADrink} recipe={recipe} key={recipe.id} />)}
        </div>

        <Link to="/recipes/new" className="btn btn-block btn-lg mt-4 btn-outline-primary">Create new recipe</Link>
      </div>
    )
  }
}
