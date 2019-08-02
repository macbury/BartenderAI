import React from 'react'
import { observer, inject } from 'mobx-react'
import PaymentView from '../components/payment_view'

@inject(({ orders: { current, refresh } }) => {
  return { current, refresh }
})
@observer
export default class PaymentsPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }

  render() {
    const { current, match: { params: { mode } } } = this.props

    return (
      <div className="payment-view">
        <PaymentView order={current} mode={mode}/>
      </div>
    )
  }
}

