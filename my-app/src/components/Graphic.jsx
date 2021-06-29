import React, { useState } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import { categoryData, getDataSortAndFilter } from '../services/graphic'
import Tooltip from './Tooltip'
import Pie from './PieGraph/Pie'
import IconPieContainer from './PieGraph/IconPieContainer'

const Graphic = () => {
  const Data = useSelector(({ balance }) =>
    getDataSortAndFilter(balance.Record)
  )
  const width = 150
  const height = 150
  const padding = 10
  const radius = Math.min(width, height) / 2 - padding
  const pie = d3.pie().value((d) => d[1])
  const pieDataRedy = pie(Data)
  const [tooltipSettings, settoolTipSettings] = useState({})

  return (
    <div style={{ display: 'flex' }}>
      {tooltipSettings && <Tooltip Settings={tooltipSettings} />}
      <svg id="ContainerSvg">
        <Pie
          width={width}
          height={height}
          pieDataRedy={pieDataRedy}
          categoryData={categoryData}
          settoolTipSettings={settoolTipSettings}
          tooltipSettings={tooltipSettings}
          radius={radius}
        />
      </svg>
      <IconPieContainer
        Data={Data}
        settoolTipSettings={settoolTipSettings}
        tooltipSettings={tooltipSettings}
        categoryData={categoryData}
      />
    </div>
  )
}

export default Graphic
