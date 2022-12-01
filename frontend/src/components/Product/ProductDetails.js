import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { addItemsToCart } from '../../actions/cartAction'
import Loader from '../layout/Loader'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ReviewCard from './ReviewCard.js'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { product, loading, error } = useSelector((state) => state.productDetails)
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  var { id } = useParams()


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const Options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const sizeHandler = async(e) => {
    if(e.target.value==="XS"){
      alert.success("Size XS Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    if(e.target.value==="S"){
      alert.success("Size S Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="M"){
      alert.success("Size M Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="L"){
      alert.success("Size L Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="XL"){
      alert.success("Size XL Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
    else if(e.target.value==="XXL"){
      alert.success("Size XXL Selected")
      await sessionStorage.setItem("SizeInfo", JSON.stringify(e.target.value))
    }
  };



  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };
  const goToCartHandler = () => {
    navigate('./../../cart')
  };

  
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      <Header />
      {loading ? (<Loader />) : (<>
        <div className='ProductDetails'>
          <div className='flex-1'>
            <Carousel>
              {product.images && product.images.map((item, i) => (
                <img
                  className='CarouselImage'
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`} />
              ))}
            </Carousel>
          </div>
          <div className='flex-2'>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product# {product._id}</p>
            </div>
            <div className="SizeButtons">
              <button type="button" style={{margin:"0.5vmax"}} value={"XS"} disabled={product.SizeS > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">XS</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"S"} disabled={product.SizeS > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">S</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"M"} disabled={product.SizeM > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">M</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"L"} disabled={product.SizeL > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">L</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"XL"} disabled={product.SizeXL > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">XL</button>
              <button type="button" style={{margin:"0.5vmax"}} value={"XXL"} disabled={product.SizeXXL > 1 ? false : true} onClick={sizeHandler} className="btn btn-outline-warning">XXL</button>
            </div>
            <div className="detailsBlock-2">
              <Rating {...Options} />
              <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <h6 style={{color:"red"}}>&#42; Please First Select Your Size</h6>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} style={{ display: product.Stock < 1 ? "none" : "" }}>Add to Cart</button>
                <button disabled={product.Stock < 1 ? true : false} onClick={goToCartHandler} style={{ display: product.Stock < 1 ? "none" : "" }}>Go to Cart</button>
              </div>
              <p>
                Status:
                <b className="helloworld" style={{ color: product.Stock < 1 ? "red" : "green" }}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b><br />
                <b>(Available - {product.Stock} QTY.)</b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>
            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
          </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className='reviews'>
            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (<p className='noReviews'>No Review Yet</p>)}
      </>)
      }
      <Footer /> </>
  )
}

export default ProductDetails