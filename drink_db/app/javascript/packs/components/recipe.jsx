import React from 'react'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'

export default class Recipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  async onClickMake(e) {
    e.preventDefault()

    this.setState({ loading: true })

    const { makeADrink, recipe: { id } } = this.props
    const errors = await makeADrink(id)

    if (errors.length > 0) {
      alert(errors.join(', '))
    }

    this.setState({ loading: false })
  }

  render() {
    const { recipe: { name, id, proportions, preparationTime, totalVolume } } = this.props
    const { loading } = this.state

    return (
      <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
        <div className="card mr-1">
          <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              <b>Preparation time:</b> {preparationTime} seconds
            </h6>
            <div className="card-text">
              <ul>
                {proportions.map(({ id, amount, bottle: { content } }) => { return <li key={id}>{content} - {amount} ml.</li> })}
              </ul>
            </div>

            <a href="#" onClick={this.onClickMake.bind(this)} className="card-link">
              {loading && <Spinner className="mr-1" size="sm" />}
              Make
            </a>
            <Link to={`/recipes/${id}`} className="card-link">Edit</Link>
            <p className="card-text"><small className="text-muted"><b> Total size:</b> {totalVolume} ml.</small></p>
          </div>
        </div>
      </div>
    )
  }
}
