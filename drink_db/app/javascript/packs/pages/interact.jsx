import React from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject(({ bartender: { currentBartender }}) => {
  return { currentBartender }
})
@observer
export default class InteractPage extends React.Component {
  render() {
    if (this.props.currentBartender.enablePayment) {
      return <Redirect to="/payments/native" />
    } else {
      return <Redirect to="/ar" />
    }
  }
}
