import React from 'react'
import "./MainHeader.css"
import Navigation from './Navigation.jsx'

const MainHeader = () => {
  return (
    <header className='main-header'>
        <h1>A Typical Page</h1>
        <Navigation/>
    </header>
  )
}

export default MainHeader