import React from 'react'
import { observer, inject } from 'mobx-react'
import Loader from '../components/loader'
import BottleForm from '../components/bottle_form'

@inject(({
  bottles: {
    currentBottle,
    prepareForEdit,
    loading,
    save,
    update,
    refill,
    errors
  }}) => {
  return {
    prepareForEdit,
    currentBottle,
    loading,
    save,
    update,
    errors,
    refill
  }
})
@observer
export default class EditBottlePage extends React.Component {
  componentDidMount() {
    const { match: { params: { bottleId } } } = this.props
    this.props.prepareForEdit(bottleId)
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { save, currentBottle, history } = this.props
    const success = await save(currentBottle)

    if (success) {
      history.push('/bottles')
    }
  }

  onChange = (key, value) => {
    this.props.update(key, value)
  }

  render() {
    const { loading, currentBottle } = this.props

    if (loading || currentBottle == null) {
      return <Loader />
    }

    const { currentBottle: { content, color, size, flowRate }, errors, refill } = this.props

    return (
      <div className="form-container">
        <div className="row justify-content-md-center">
          <div className="col-md-8 col-sm-10 col-lg-6">
            <BottleForm bottle={currentBottle}
                        errors={errors}
                        onRefill={refill}
                        onSubmit={this.onSubmit}
                        onChange={this.onChange} />
          </div>
        </div>
      </div>
    )
  }
}
