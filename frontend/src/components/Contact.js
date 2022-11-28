import React from 'react'
import './About.css'
import Footer from './layout/Footer'
import Header from './layout/Header'
import MetaData from './layout/MetaData.js'


const Contact = () => {
  return (
    <>
      <Header />
      <MetaData title='RagsaaTextiles - Contact Us'/> 
      <div className="container"><div className="containerr">
        <div class="up1">
          <div className="up" style={{boxShadow: "0 0 50px rgba(15,15,15,0.25)"}}></div>
        </div>
        <div className="down">
        <div className="item"><h2>ContactUs</h2></div>
          <div className='p1'><p><b>Mobile :- 6367386646  ,  9461933266</b><br /><b>Email :- support@ragsaatextiles.com</b><br/><b>Corporate Office :- 4F02, 4th Floor, Mahima Trinity, New Sanganer Road, Sodala, Jaipur</b><br/><b>Factory :- 10B, Sharma Colony, Nandpuri Colony, Sodala, Jaipur</b></p></div></div>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact