import React from 'react'
import '../styles/GraphicStyle.css'
const Tooltip = ({ Settings }) => {
  return (
    <div
      id="tooltip"
      style={Object.assign(
        {
          left: Settings.left,
          top: Settings.top,
        },
        Settings.opacity && { opacity: Settings.opacity }
      )}
    >
      {Settings.text}
    </div>
  )
}

export default Tooltip
