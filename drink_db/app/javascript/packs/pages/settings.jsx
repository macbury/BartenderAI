import React from 'react'
import { observer, inject } from 'mobx-react'
import { CustomInput } from 'reactstrap'
import Loader from '../components/loader'

@inject(({
  bartender: {
    loading,
    currentBartender,
    refresh,
    update
  }}) => {
  return {
    loading,
    currentBartender,
    refresh,
    update
  }
})
@observer
export default class SettingsPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }

  toggleEnablePayment = ({ target: { value } }) => {
    const { currentBartender: { enablePayment }, update } = this.props
    update('enablePayment', !enablePayment)
  }

  render() {
    const { loading, currentBartender } = this.props

    if (loading || currentBartender == null) {
      return <Loader />
    }

    const { enablePayment } = currentBartender
    return (
      <div className="container form-container">
        <CustomInput  type="switch"
                      id="enablePayment"
                      name="enablePayment"
                      checked={enablePayment}
                      onChange={this.toggleEnablePayment}
                      label="Enable payment using Bitcoin Lighting network" />
      </div>
    )
  }
}
