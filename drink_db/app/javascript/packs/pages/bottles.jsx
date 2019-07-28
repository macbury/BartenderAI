import React from 'react'
import { observer, inject } from 'mobx-react'

import Loader from '../components/loader'
import BottleSlot from '../components/bottle_slot'

@inject(({ bottles: { list, refresh, loading } }) => {
  return { refresh, list, loading }
})
@observer
export default class BottlesPage extends React.Component {
  componentDidMount() {
    this.props.refresh()
  }

  render() {
    const { list, loading } = this.props

    if (loading && list.length == 0) {
      return <Loader />
    }

    return (
      <div className="bottles-container content">
        {list.map((bottle) => <BottleSlot key={bottle.id} bottle={bottle} />)}
      </div>
    )
  }
}
