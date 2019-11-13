export default class ActionCableSubscriber {
  constructor(cable) {
    this.cable = cable
    this.registry = {}
  }

  unsubscribe(channelId) {
    if (this.registry[channelId] != null){
      this.registry[channelId].unsubscribe()
      this.registry[channelId] = null
    }
  }

  subscribe(graphQLParams, callback) {
    const channelId = this.getUuid()

    const channel = this.cable.subscriptions.create({
      channel: "GraphqlChannel",
      channelId
    }, {
      connected: () => {
        channel.perform('execute', graphQLParams)
      },

      rejected: () => {
        callback(new Error('Connection rejected from server'), null)
      },

      received: (payload) => {
        if (payload.result && payload.result.data) {
          callback(null, payload.result.data);
        }

        if (!payload.more) {
          this.unsubscribe(channelId)
        }
      }
    })
    this.registry[channelId] = channel
    return channelId
  }

  getUuid() {
    return Math.round(Date.now() + Math.random() * 100000).toString(16)
  }
}
