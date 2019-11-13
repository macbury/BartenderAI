import React from 'react'
import { observer, inject } from 'mobx-react'

@inject(({ bartender: { isOnline } }) => {
  return { isOnline }
})
@observer
export default class BartenderConnection extends React.Component {
  render() {
    if (this.props.isOnline) {
      return <span className="badge badge-success">Online</span>
    } else {
      return <span className="badge badge-danger">Offline</span>
    }
  }
}
