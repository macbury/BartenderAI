import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loader() {
  return (
    <div className="loading-container">
      <Spinner style={{ width: '5rem', height: '5rem' }} />
    </div>
  )
}