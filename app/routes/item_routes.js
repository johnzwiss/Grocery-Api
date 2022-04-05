// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for carts
const Cart = require('../models/cart')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { cart: { title: '', text: 'foo' } } -> { cart: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ~~~~~~~~~~~~~
// ROUTES
// ~~~~~~~~~~~~~

// POST -> adds an item to cart if it exists
// creates cart if one doesn't exist and pushes item to array
// POST /item/add

router.post('/item/add',requireToken, async (req, res, next) => {
    const item = req.body.item
    const {name} = item
    cartOwner = req.user.id
    try {
        let cart = await Cart.find({ owner: cartOwner });
    
        if (cart) {
          //cart exists for user
          let itemIndex = cart[0].items.findIndex(i => i.name == name);
          //p => p.productId == productId
    
          if (itemIndex > -1) {
            //product exists in the cart, update the quantity
            let targetItem = cart[0].items[itemIndex];
            //let productItem
            targetItem.qty = parseInt(targetItem.qty) + parseInt(item.qty);
            cart[0].items[itemIndex] = targetItem;
          } else {
            //product does not exists in cart, add new item
            cart[0].items.push({ name,price,qty });
          }
          cart = await cart[0].save();
          return res.status(201).json({ cart: cart[0] })
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }

})





module.exports = router