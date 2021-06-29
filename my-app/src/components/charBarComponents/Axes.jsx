import React from 'react'
import {
  getTicksFormatForUnit,
  getTicksTimeForUnit,
} from '../../services/charBar'

const Axes = ({ xScale, yScale, height, padding, width, unit }) => {
  return (
    <>
      <g id="x-axis" transform={`translate(${padding},${height - padding})`}>
        <line x2={width - padding} stroke="black"></line>
        {xScale.ticks(getTicksTimeForUnit(unit)).map((tick) => {
          return (
            <g key={xScale(tick)} transform={`translate(${xScale(tick)},0)`}>
              <line y2={2} stroke="black"></line>
              <text
                style={{ fontSize: '10px' }}
                transform={`translate(0,8)rotate(45)`}
              >
                {getTicksFormatForUnit(unit, tick)}
              </text>
            </g>
          )
        })}
      </g>

      <g id="y-axis" transform={`translate(${padding},0)`}>
        <line y2={height - padding} stroke="black" />
        {yScale.ticks().map((tick) => {
          return (
            <g key={xScale(tick)} transform={`translate(-5,${yScale(tick)})`}>
              <line x2={5} stroke="black" />
              <text
                style={{
                  fontSize: '10px',
                }}
                transform={`translate(${-5.65 * tick.toString().length},0)`}
              >
                {tick}
              </text>
            </g>
          )
        })}
      </g>
    </>
  )
}

export default Axes
