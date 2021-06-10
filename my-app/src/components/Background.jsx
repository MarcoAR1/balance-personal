import React from 'react'
import '../styles/Background.css'
const Background = ({ children }) => {
  return (
    <header className="bg_animate">
      <div className="header_nav">
        <div className="contenedor"></div>
      </div>
      {children}

      <section className="banner contenedor"></section>
      <div className="burbujas">
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
        <div className="burbuja"></div>
      </div>
    </header>
  )
}

export default Background
