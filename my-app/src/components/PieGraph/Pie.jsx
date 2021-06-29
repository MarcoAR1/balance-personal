import React from 'react'
import * as d3 from 'd3'
const Pie = ({
  width,
  height,
  pieDataRedy,
  categoryData,
  settoolTipSettings,
  tooltipSettings,
  radius,
}) => {
  return (
    <g transform={`translate(${width / 2},${height / 2})`}>
      {pieDataRedy.map(({ startAngle, endAngle, data }) => {
        return (
          <path
            key={data[0]}
            d={d3.arc()({
              innerRadius: 0,
              outerRadius: radius,
              startAngle,
              endAngle,
            })}
            fill={categoryData[data[0]].color}
            stroke={categoryData[data[0]].color}
            className="pie-chart-section"
            onMouseOver={(e) => {
              settoolTipSettings({
                left: e.clientX - 60,
                top: e.clientY - 110,
                text: (
                  <p>
                    Category: <br />
                    {data[0]}
                    <br />
                    Spent:
                    <br />
                    {data[1]}$
                  </p>
                ),
                opacity: 0.9,
                selected: data[0],
              })
            }}
            onMouseOut={() => {
              settoolTipSettings((prev) => {
                return { ...prev, opacity: false, selected: null }
              })
            }}
            style={
              tooltipSettings.selected === data[0]
                ? { transform: 'scale(1.1)' }
                : {}
            }
          ></path>
        )
      })}
    </g>
  )
}

export default Pie
