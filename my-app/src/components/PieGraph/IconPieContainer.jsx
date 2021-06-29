import React from 'react'
import '../../styles/GraphicStyle.css'
const IconPieContainer = ({
  Data,
  settoolTipSettings,
  tooltipSettings,
  categoryData,
}) => {
  return (
    <div className="iconCategoryContainer">
      {Data.map((e) => {
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
  )
}

export default IconPieContainer
