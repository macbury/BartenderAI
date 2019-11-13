import React from 'react'
import Header from './header'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { observer, inject } from 'mobx-react'

const translate = {
  pending: 'Waiting for barman',
  done: 'Done',
  preparing: 'Pouring drink',
  rejected: 'Rejected',
  waiting_for_invoice: 'Waiting for invoice',
  waiting_for_payment: 'Waiting for payment'
}

@inject(({ orders: { current, pendingOrders } }) => {
  return { pendingOrders, current }
})
@observer
export default class OrderNavBar extends React.Component {
  render() {
    const { pendingOrders, current } = this.props

    if (!current) {
      return null
    }

    const { id, status } = current

    if (status === 'done' || status === 'rejected') {
      return null
    }

    return (
      <nav key={id} className="navbar navbar-expand-lg navbar-dark bg-primary fixed-bottom">
        <div className="container d-flex justify-content-center">
          <Link to={`/orders`} className="navbar-brand">
            <b>Order #{id} of {pendingOrders.length}:</b> {translate[status]}
          </Link>
          <Spinner />
        </div>
      </nav>
    )
  }
}
