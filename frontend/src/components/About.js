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
          <div className='p1'><p>Ragsaa is a Jaipur based Indian and fusion wear clothing brand that focus on dressing up today modern age woman and make her feel beautiful and confident about herself.<br/><br/>The clothes are designed using the authentic hand block of Jaipur with prints that are exclusive . The dynamic fashion revolves around everyday wear to festive outfits and summer dresses. All are curated by the founder Mr Abrar Ahmed Ansai</p></div>
        </div></div>
      </div>
      <Footer />
    </>
  )
}

export default About