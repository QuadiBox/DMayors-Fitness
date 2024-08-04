import React from 'react'

const HeroSectBg = ({ src = "/hero_img5.jpg"}) => {
  return (
    <div class="heroSectBg" style={{backgroundImage: `url(${src})`}}>
        <div class="div">
            <img src={src} alt=""/>
        </div>
        <div class="div">
            <img src={src} alt=""/>
        </div>
        <div class="div">
            <img src={src} alt=""/>
        </div>
    </div>
  )
}

export default HeroSectBg
