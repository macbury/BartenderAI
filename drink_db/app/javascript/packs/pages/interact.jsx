import React from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'reactstrap'

@inject(({ bartender: { currentBartender, refresh, loading }}) => {
  return { currentBartender, refresh, loading }
})
@observer
export default class InteractPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }
  render() {
    if (this.props.loading) {
      return <Spinner />
    } else if (this.props.currentBartender.enablePayment) {
      return <Redirect to="/payments/native" />
    } else {
      return <Redirect to="/ar" />
    }
  }
}
