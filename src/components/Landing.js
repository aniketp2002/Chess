import React, { useState } from 'react'

import "./landing.css"
import Offline from './Offline';
import Online from './Online';

import landingimg from '../assets/landingpage.jpg';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
const Landing = ({hidelanding}) => {
  
  return (
    <>
        <Router>
        <div className="contnr">
        {/* <img src={landingimg} className="bdy"/> */}
        <div className="head">
            <div className="heading">ChessMaster</div>
            <div className="subheading">SAY <span className='fcColor'>"YES!"</span>  NEW <span className='fcColor'>VICTORIES</span> <br />AND INCREASED <span className='fcColor'>THINKING!</span></div>
            <br />
            <div className="">
              <Link to="/online"><button type="button" class="btn1" onClick={()=>hidelanding(false)}>Online</button></Link> 
              <Link to="/offline"><button type="button" class="btn1  mx-3 " onClick={()=>hidelanding(false)}>Offline</button></Link>
            </div>
            <Routes>
                  <Route exact path='/' element={<Landing/>}></Route>
                 <Route exact path='/online' element={<Online/>}></Route>
                 <Route exact path='/offline' element={<Offline/>}></Route>
            </Routes>
        </div>
        <img src={landingimg} className="bdy"/>
        </div>
        </Router>
       
    </>     
        
    
  )
}

export default Landing