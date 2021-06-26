import React, { useState } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import '../styles/GraphicStyle.css'
import KitchenIcon from '@material-ui/icons/Kitchen'
import CommuteIcon from '@material-ui/icons/Commute'
import LocalAirportIcon from '@material-ui/icons/LocalAirport'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CastForEducationIcon from '@material-ui/icons/CastForEducation'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

const categoryData = {
  Travel: {
    color: '#3A7EFE',
    icon: <LocalAirportIcon style={{ color: '#3A7EFE' }}></LocalAirportIcon>,
  },
  Transport: {
    color: '#583AFE',
    icon: <CommuteIcon style={{ color: '#583AFE' }}></CommuteIcon>,
  },
  Food: {
    color: '#BA3AFE',
    icon: <KitchenIcon style={{ color: '#BA3AFE' }}></KitchenIcon>,
  },
  Services: {
    color: '#FE3AE0',
    icon: <WhatshotIcon style={{ color: '#FE3AE0' }}></WhatshotIcon>,
  },
  Restaurants: {
    color: '#FE3A7E',
    icon: <RestaurantIcon style={{ color: '#FE3A7E' }}></RestaurantIcon>,
  },
  'Health and self-care': {
    color: '#FE583A',
    icon: (
      <FavoriteBorderIcon style={{ color: '#FE583A' }}></FavoriteBorderIcon>
    ),
  },
  Wardrobe: {
    color: '#C6FE3A',
    icon: <ShoppingCartIcon style={{ color: '#C6FE3A' }}></ShoppingCartIcon>,
  },
  Education: {
    color: '#D43AFE',
    icon: (
      <CastForEducationIcon style={{ color: '#D43AFE' }}></CastForEducationIcon>
    ),
  },
  'Entertainment and fun': {
    color: '#FE3A64',
    icon: <FastfoodIcon style={{ color: '#FE3A64' }}></FastfoodIcon>,
  },
  Other: {
    color: '#FE723A',
    icon: <HelpOutlineIcon style={{ color: '#FE723A' }}></HelpOutlineIcon>,
  },
}

const Graphic = () => {
  const recordSub = useSelector(({ balance }) =>
    balance.Record.filter((e) => e.type === 'sub')
  )
  const width = 150
  const height = 150
  const padding = 10
  const radius = Math.min(width, height) / 2 - padding
  const dataFixedRecordSub = Object.entries(
    recordSub.reduce((reducer, record) => {
      const currentCategory = JSON.parse(record.description).category
      const copy = { ...reducer }
      copy[currentCategory]
        ? (copy[currentCategory] += parseInt(record.amount))
        : (copy[currentCategory] = parseInt(record.amount))
      return copy
    }, {})
  )
  const pie = d3.pie().value((d) => d[1])
  const pieDataRedy = pie(dataFixedRecordSub)
  const [tooltipSettings, settoolTipSettings] = useState({})

  return (
    <div style={{ display: 'flex' }}>
      <div
        id="tooltip"
        style={Object.assign(
          {
            left: tooltipSettings.left,
            top: tooltipSettings.top,
          },
          tooltipSettings.opacity && { opacity: tooltipSettings.opacity }
        )}
      >
        {tooltipSettings.text}
      </div>

      <svg id="ContainerSvg">
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
      </svg>
      <div className="iconCategoryContainer">
        {dataFixedRecordSub.map((e) => {
          return (
            <div
              onMouseOver={() => {
                settoolTipSettings((prev) => {
                  return { ...prev, selected: e[0] }
                })
              }}
              onMouseOut={() => {
                settoolTipSettings((prev) => {
                  return { ...prev, selected: null }
                })
              }}
              key={e[0]}
              style={Object.assign(
                { fontSize: 10 },
                tooltipSettings.selected === e[0] && {
                  transform: 'scale(1.2)',
                  border: '1px  rgba(0,0,255,0.2) solid',
                  borderRadius: '10px',
                }
              )}
            >
              {categoryData[e[0]].icon}
              {e[0]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Graphic
