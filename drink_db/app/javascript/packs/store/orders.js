import { observable, action, runInAction, flow, computed } from 'mobx'
import { onUpdateOrder, fetchPendingOrders, updateOrder } from '../api/orders'

class Orders {
  @observable loading = true
  @observable orders = []

  constructor() {
    this.setup()
  }

  @computed get pendingOrders() {
    return this.orders.filter((order) => order.status !== 'done' || order.status !== 'rejected')
  }

  @computed get preparedOrders() {
    return this.orders.filter((order) => order.status === 'preparing')
  }

  @computed get current() {
    return this.preparedOrders[0] || this.pendingOrders[this.pendingOrders.length - 1]
  }

  rejectOrder = flow(function * (orderId) {
    yield updateOrder({ id: orderId, status: 'rejected' })
    this.orders = yield fetchPendingOrders()
  }.bind(this))

  refresh = flow(function * (key, value) {
    this.loading = true
    this.orders = yield fetchPendingOrders()
    this.loading = false
  }.bind(this))

  @action async setup() {
    this.orders = await fetchPendingOrders()

    onUpdateOrder().subscribe({
      next: ({ data: { onUpdateOrder: updatedOrder } }) => {
        runInAction('Update orders through websocket', () => {
          const orderIndex = this.orders.findIndex((order) => updatedOrder.id === order.id)

          if (orderIndex === -1) {
            this.orders.push(updatedOrder)
          } else {
            const order = this.orders[orderIndex]
            this.orders[orderIndex] = {...order, ...updatedOrder}
          }
        })
      }
    })
  }
}

const orders = new Orders()

export default orders
