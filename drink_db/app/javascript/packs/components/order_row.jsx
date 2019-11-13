import React from 'react'
import { Spinner, Button } from 'reactstrap'
import { observer, inject } from 'mobx-react'

@inject(({ orders: { rejectOrder } }) => {
  return { rejectOrder }
})
@observer
export default class OrderRow extends React.Component {
  rejectOrder = async (e) => {
    e.preventDefault()
    const { order: { id }, rejectOrder } = this.props
    await rejectOrder(id)
  }

  render() {
    const { order: { id, recipe: { name }, status } } = this.props
    return (
      <tr>
        <th scope="row">#{id}</th>
        <td>{name}</td>
        <td>{status}</td>
        <td>
          <Button outline color="danger" size="sm" onClick={this.rejectOrder}>Reject</Button>
        </td>
      </tr>
    )
  }
}