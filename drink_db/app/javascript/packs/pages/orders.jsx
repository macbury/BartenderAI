import React from 'react'
import { observer, inject } from 'mobx-react'
import { Table, Button } from 'reactstrap'
import Loader from '../components/loader'
import OrderRow from '../components/order_row'

@inject(({
  orders: {
    loading,
    pendingOrders,
    refresh
  }}) => {
  return {
    loading,
    pendingOrders,
    refresh
  }
})
@observer
export default class OrdersPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }

  render() {
    const { loading, pendingOrders } = this.props

    if (loading || pendingOrders == null) {
      return <Loader />
    }

    if (pendingOrders.length == 0) {
      return (
        <div className="container form-container">
          There is no pending orders
        </div>
      )
    }

    return (
      <div className="container form-container">
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Recipe</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {pendingOrders.map((order) => <OrderRow order={order} key={order.id} />)}
          </tbody>
        </Table>
      </div>
    )
  }
}
