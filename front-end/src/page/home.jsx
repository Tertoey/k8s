import React from 'react'
import Data from '../component/data'
import Weather from '../component/weather'
import '../style/style.css'

function Home() {
  return (
    <div className='homeee'>
      <h1>Homepage</h1>
      <Data />
      <Weather/>
    </div>
  )
}

export default Home