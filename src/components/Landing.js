import React from 'react'
import "./landing.css"
import landingimg from '../assets/landingpage.jpg';
const Landing = () => {
  return (
    <>
        <div className="contnr">
        {/* <img src={landingimg} className="bdy"/> */}
        <div className="head">
            <div className="heading">ChessMaster</div>
            <div className="subheading">SAY <span className='fcColor'>"YES!"</span>  NEW <span className='fcColor'>VICTORIES</span> <br />AND INCREASED <span className='fcColor'>THINKING!</span></div>
            <br />
            <div className="">
              <button type="button" class="btn1">Online</button>
              <button type="button" class="btn1  mx-3 ">Offline</button>
            </div>
        </div>
        <img src={landingimg} className="bdy"/>
        </div>
    </>     
        
    
  )
}

export default Landing