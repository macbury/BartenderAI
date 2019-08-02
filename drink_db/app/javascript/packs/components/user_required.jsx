import React from 'react'
import { observer, inject } from 'mobx-react'
import { Spinner, Button } from 'reactstrap'
import beerLogo from '../images/beer.svg'

@inject(({ store: { loading, loggedIn, setup, onLine } }) => {
  return { loading, loggedIn, setup, onLine }
})
@observer
export default class UserRequired extends React.Component {
  componentDidMount() {
    const { setup } = this.props
    setup()
  }

  render() {
    const { children, loading, loggedIn, onLine } = this.props
    if (!onLine) {
      return (
        <div className="loading-container">
          Offline...
        </div>
      )
    }

    if (loading && !loggedIn) {
      return (
        <div className="loading-container">
          <Spinner style={{ width: '5rem', height: '5rem' }} />
        </div>
      )
    }

    if (!loggedIn) {
      return (
        <div className="login-container">
          <img src={beerLogo} />
          <br/>
          <a href={`/auth?redirect_to=${window.location.pathname}`} className="btn btn-primary btn-lg">
            Sign in using Google
          </a>
        </div>
      )
    }

    return <React.Fragment>{children}</React.Fragment>
  }
}
