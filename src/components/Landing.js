import React, { useState } from 'react'

import "./landing.css"
import Offline from './Offline';
import Online from './Online';

import landingimg from '../assets/landingpage.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Modal from './Modal';
const Landing = ({ hidelanding }) => {

  return (
    <>
      <div className="contnr">
        {/* <img src={landingimg} className="bdy"/> */}
        <div className="head">
          <div className="heading">ChessMaster</div>
          <div className="subheading">SAY <span className='fcColor'>"YES!"</span>  NEW <span className='fcColor'>VICTORIES</span> <br />AND INCREASED <span className='fcColor'>THINKING!</span></div>
          <br />
          <div className="">
            <button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" class="btn1" onClick={() => hidelanding(false)}>Online</button>
            <Link to="/offline"><button type="button" class="btn1  mx-3 " onClick={() => hidelanding(false)}>Offline</button></Link>
          </div>
        </div>
        <img src={landingimg} className="bdy" />
      </div>
      <Modal />
    </>


  )
}

export default Landing