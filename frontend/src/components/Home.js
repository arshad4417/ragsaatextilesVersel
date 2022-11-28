import React, { useEffect } from 'react'
import Carousal from './layout/Carousal.js'
import './Home.css'
import Header from './layout/Header.js'
import Footer from './layout/Footer.js'
import Product from './ProductCard.js'
import MetaData from './layout/MetaData.js'
import { clearErrors, getProduct } from '../actions/productAction.js'
import { useSelector, useDispatch } from "react-redux"
import Loader from './layout/Loader.js'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (<Loader />) : (<>
        <MetaData title='RagsaaTextiles - Home' />
        <Header />
        <div className="home">
          <Carousal />
        </div>
        <div className='container' style={{ display: "flex" }}>
          <div style={{marginLeft: "40px", marginRight: "40px"}}><div className='image1' style={{ height: "120px", width: "120px", borderRadius: 100, backgroundImage: `url("https://res.cloudinary.com/ragsaatextiles01/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669451927/payment_avatar/Shipping_lzln7v.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", border: "4px solid grey" }}></div><div><h6>FREE DELIVERY</h6></div></div>
          <div style={{marginLeft: "40px", marginRight: "40px"}}><div className='image1' style={{ height: "120px", width: "120px", borderRadius: 100, backgroundImage: `url("https://res.cloudinary.com/ragsaatextiles01/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669451927/payment_avatar/payment_eytokx.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", border: "4px solid grey" }}></div><div><h6>SECURE PAYMENT</h6></div></div>
          <div style={{marginLeft: "40px", marginRight: "40px"}}><div className='image1' style={{ height: "120px", width: "120px", borderRadius: 100, backgroundImage: `url("https://res.cloudinary.com/ragsaatextiles01/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669451927/payment_avatar/qaulity_peww1f.png")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", border: "4px solid grey" }}></div><div><h6>ASSURED QUALITY</h6></div></div>
          <div style={{marginLeft: "40px", marginRight: "40px"}}><div className='image1' style={{ height: "120px", width: "120px", borderRadius: 100, backgroundImage: `url("https://res.cloudinary.com/ragsaatextiles01/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1669451927/payment_avatar/return_huzqsd.jpg")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", border: "4px solid grey" }}></div><div><h6>EASY RETURN</h6></div></div>
        </div>
        <div className="item"><h2>Featured Products </h2></div>
        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
          <Link to="/products" style={{ display: "flex", textDecoration: "none", margin: "1vmax 0 5vmax 0" }}><button style={{ backgroundColor: "skyblue", borderRadius: "10px", padding: "0.5vmax" }}>More Products</button></Link>
        </div>
        <Footer />
      </>
      )
      }</>
  )
}

export default Home