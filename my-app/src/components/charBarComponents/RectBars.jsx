import React from 'react'
import { getWidthRatio } from '../../services/charBar'

const ReactBars = ({ data, xScale, yScale, height, padding, width, unit }) => {
  let widthForPar = getWidthRatio(unit, xScale.domain(), width)
  const widthForBar = widthForPar / 2
  return Object.entries(data).map((data) => {
    if (data[0] === 'all' || data[0] === 'maxAdd') {
      return ''
    }
    return (
      <g key={data[1].currentFullDate} transform={`translate(${padding},0)`}>
        <rect
          width={widthForBar}
          height={height - padding - yScale(data[1].add)}
          fill="blue"
          x={xScale(new Date(data[1].currentFullDate))}
          y={yScale(data[1].add)}
        />
        <rect
          width={widthForBar}
          height={height - padding - yScale(data[1].sub)}
          fill="red"
          x={xScale(new Date(data[1].currentFullDate)) - widthForBar}
          y={yScale(data[1].sub)}
        />
      </g>
    )
  })
}

export default ReactBars
