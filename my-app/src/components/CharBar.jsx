import React from 'react'
import CardHome from './CardHome'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import {
  getMaxAmountForUnits,
  handleCurrentMonthDate,
  handleSortDate,
} from '../services/charBar'
import Axes from './charBarComponents/Axes'
import ReactBars from './charBarComponents/RectBars'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const CharBar = () => {
  const width = 300
  const height = 300
  const padding = 50
  const matches = useMediaQuery('(min-width:800px)')

  const dateForCharRange = {
    startDate: handleCurrentMonthDate('start'),
    endDate: handleCurrentMonthDate('end'),
  }
  const unitForCharRange = 'day'

  /*   const [dateForCharRange, setDateForCharRange] = useState({
    startDate: handleCurrentMonthDate('start'),
    endDate: handleCurrentMonthDate('end'),
  })
  const [unitForCharRange, setUnitForCharRange] = useState('day')
 */
  const recordSortedForDate = useSelector(({ balance }) =>
    balance.Record.reduce(
      (object, record) => {
        return handleSortDate(object, record, dateForCharRange)
      },
      { all: balance.Record }
    )
  )

  const amountsForSelectedUnit = getMaxAmountForUnits(
    unitForCharRange,
    dateForCharRange,
    recordSortedForDate
  )
  // Scales X and Y

  const yScale = d3
    .scaleLinear()
    .domain([0, amountsForSelectedUnit['maxAdd']])
    .range([height - padding, 0])

  const xScale = d3
    .scaleTime()
    .domain([dateForCharRange.startDate, dateForCharRange.endDate])
    .range([0, width - padding])

  return (
    <CardHome
      style={Object.assign(
        {
          marginTop: '15px',
          display: 'flex',
          flexDirection: 'column',
        },
        !matches && { display: 'none' }
      )}
      ContainerButtons={{ style: { display: 'none' } }}
    >
      <div style={{ alignSelf: 'center' }} id="title">
        Month Statistics
      </div>
      <div id="containerCharBar">
        <svg
          width={width}
          height={height}
          id="svgCharBar"
          style={{ overflow: 'visible' }}
        >
          <Axes
            xScale={xScale}
            yScale={yScale}
            height={height}
            padding={padding}
            width={width}
            unit={unitForCharRange}
          />
          <ReactBars
            data={amountsForSelectedUnit}
            xScale={xScale}
            yScale={yScale}
            height={height}
            padding={padding}
            width={width}
            unit={unitForCharRange}
          />
        </svg>
      </div>
    </CardHome>
  )
}

export default CharBar
