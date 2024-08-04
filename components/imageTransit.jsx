import React from 'react'

const ImageTransit = ({ src }) => {
  return (
    <div className="transCntn rotate" style={{backgroundImage: `linear-gradient(to bottom, #0f0f0a04, 70%, var(--dark-clr1)), url(${src})`}}>
        <div className="transimg1" style={{backgroundImage: `linear-gradient(to bottom, #0f0f0a04, 70%, var(--dark-clr1)), url(${src})`}}></div>
        <div className="transimg2" style={{backgroundImage: `linear-gradient(to bottom, #0f0f0a04, 70%, var(--dark-clr1)), url(${src})`}}></div>
        <div className="transimg3" style={{backgroundImage: `linear-gradient(to bottom, #0f0f0a04, 70%, var(--dark-clr1)), url(${src})`}}></div>
    </div>
  )
}

export default ImageTransit
