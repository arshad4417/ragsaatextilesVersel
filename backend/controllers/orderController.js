const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail');
const User = require('../models/UserModel');


//create new order 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(res.user._id);
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice ,SizeInfo  } = req.body;
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,SizeInfo ,paidAt:Date.now(),user:res.user._id,email:res.user.email
    })
    
    await sendEmail({
      email:user.email,
      emailToAdmin:"ragsaatextiles@gmail.com",
      subject: 'Order Successfully from RagsaaTextiles',
      message:`Thankyou For Placing Order ${user.name} \n\n\nYour itemsPrice -${order.itemsPrice}\nYour GSTPrice -${order.taxPrice}\nYour Shipping Amount -${order.shippingPrice}\nYour Total Amount -${order.totalPrice}\n\n\n Your Product deliver by our corrier partner as soon as possible`,
  });
    res.status(200).json({
        success:true,
        order 
    })
})

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  
  // get logged in user  Orders
  exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: res.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });
  
  // get all Orders -- Admin
  exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
  
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });
  
  // update Order Status -- Admin
  exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(res.user._id);
    const order = await Order.findById(req.params.id);
    const useremail=await User.findById(order.user)
    
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      await sendEmail({
        email:useremail.email,
        subject: 'Order Successfully Delivered from RagsaaTextiles',
        message:`Thankyou For Placing Order \n\n\nYour itemsPrice -${order.itemsPrice}\nYour taxPrice -${order.taxPrice}\nYour Shipping Amount -${order.shippingPrice}\nYour Total Amount -${order.totalPrice}\n\n\n Your Product deliver by our corrier partner as soon as possible`,
    });
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      await sendEmail({
        email:useremail.email,
        subject: 'Order Successfully Shipped from RagsaaTextiles',
        message:`Thankyou For Placing Order \n\n\nYour itemsPrice -${order.itemsPrice}\nYour taxPrice -${order.taxPrice}\nYour Shipping Amount -${order.shippingPrice}\nYour Total Amount -${order.totalPrice}\n\n\n Your Product deliver by our corrier partner as soon as possible`,
    });
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });

  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });
  