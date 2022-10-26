import React from 'react'
import "./landing.css"
import landingimg from '../assets/landingpage.jpg';
const Landing = () => {
  return (
    <>
        <div className="contnr">
        <div className="head">
            <div className="heading">Chess</div>
            <div className="btngrp">
              <button type="button" class="btn btn-light">Light</button>
              <button type="button" class="btn btn-light">Light</button>
            </div>
        </div>
        <img src={landingimg} className="bdy"/>
        </div>
    </>     
        
    
  )
}

export default Landing