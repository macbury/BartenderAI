import React from 'react'
import PropTypes from 'prop-types'
import LiquidFillGauge from '../lib/liquid_fill_gauge'

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export default class LiquidGauge extends React.Component {
  componentDidMount() {
    const { value, color } = this.props

    const rgb = hexToRgb(color)

    this.gauge = LiquidFillGauge(this.node, value, {
      waveAnimateTime: 2000,
      waveColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`,
      circleColor: color,
      textColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.6)`,
      waveTextColor: color,
      maxValue: 130
    });
  }

  componentDidUpdate() {
    this.gauge.update(this.props.value)
  }

  render() {
    const { size } = this.props
    return <svg ref={node => this.node = node} width="97%" height={size}></svg>
  }
}

LiquidGauge.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
}
