import React from 'react'
import fetch from 'isomorphic-fetch'
import { graphQLFetcher } from "graphiql-subscriptions-fetcher/dist/fetcher"
import ActionCable from 'actioncable'
import { observer, inject } from 'mobx-react'
import GraphiQL from 'graphiql'
import ActionCableSubscriber from '../lib/action_cable_subscriber'

@inject(({ store: { accessToken } }) => {
  return { accessToken }
})
@observer
export default class ApiExplorer extends React.Component {
  render() {
    const cable = ActionCable.createConsumer(`//${window.location.host}/api/rt?token=${this.props.accessToken}`)
    const fetcher = graphQLFetcher(new ActionCableSubscriber(cable), (graphQLParams) => {
      return fetch(window.location.origin + `/api?token=${this.props.accessToken}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json());
    })
    return (
      <div className="api-explorer">
        <GraphiQL fetcher={fetcher} />
      </div>
    )
  }
}
