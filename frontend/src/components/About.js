import React from 'react'
import Header from './layout/Header'
import './About.css'
import Footer from './layout/Footer'
import MetaData from './layout/MetaData.js'


const About = () => {
  return (
    <>
      <Header />
      <MetaData title='RagsaaTextiles - About Us'/> 
      <div className="container"><div className="containerr">
        <div class="up1">
          <div className="up" style={{boxShadow: "0 0 50px rgba(15,15,15,0.25)"}}></div>
        </div>
        <div className="down">
        <div className="item"><h2>About Work</h2></div>
          <div className='p1'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates nihil ducimus harum odit! Ipsam inventore, voluptatum ex aliquam repudiandae dicta quibusdam quis non voluptatem incidunt, magnam atque placeat? Iste. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum itaque enim corporis aperiam eaque maiores minus. Possimus obcaecati iusto modi beatae, cupiditate vel! Praesentium fugiat magnam cumque eveniet, tempora blanditiis a nisi eius dolorum maxime dicta quae neque, quisquam exercitationem! Minus ipsam corporis quae quis, repellat accusantium? Eius, ipsam magnam. Lorem ipsum dolor sit amet consectetur, adipisicing </p></div>
        </div></div>
      </div>
      <Footer />
    </>
  )
}

export default About