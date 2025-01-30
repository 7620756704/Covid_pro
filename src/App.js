import React from 'react'
import CovidService from './api/CovidService';
import './App.css';

const App = () => {
  return (
    <div className='full-container'>
        <div className='container'>
       <CovidService></CovidService>
    </div>
    </div>
  )
}

export default App