import React from 'react'
import LiquidGauge from './liquid_gauge'
import { Link } from 'react-router-dom'

export default function BottleSlot({ bottle }) {
  const { content, color, id, liquidLeft, size } = bottle
  const value = Math.round(liquidLeft / size * 100)

  return (
    <Link to={`/bottles/${id}`} className="bottle-slot">
      <LiquidGauge value={value} size={90} color={color} />
      <h3>{ content }</h3>
    </Link>
  )
}