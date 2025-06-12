import React from 'react'
import './Load.css'

const Load = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
          <div className="loading-text">
          <span>Loading...</span>
          <div className='gap'>First Launch May Take a While</div>
          </div>
    </div>
  )
}

export default Load