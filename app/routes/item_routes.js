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
    const {name,price,qty} = item
    const cartOwner = req.user.id
    try {
        let cart = await Cart.find({ owner: cartOwner })
    
        if (cart!==[]) {
          //cart exists for user
          let itemIndex = cart[0].items.findIndex(i => i.name == name)
          //p => p.productId == productId
            // require auth
            requireOwnership(req, cart[0])
    
          if (itemIndex > -1) {
            //item exists in the cart, update the quantity
            let targetItem = cart[0].items[itemIndex]
            targetItem.qty ++
            cart[0].items[itemIndex] = targetItem
          } else {
    
            //item does not exists in cart, add new item
            cart[0].items.push({ name,price,qty })
          }
          cart = await cart[0].save()
          return res.status(201).json({ cart: cart[0] })
        }
        else {
            //no cart for user, create new cart
            let newCart = await Cart.create({ checkedOut: 'false', owner: cartOwner})
            newCart.items.push({name,price,qty})
            newCart = await newCart.save()
            return res.status(201).send(newCart);
          }
    
      } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong")
      }

})




// DELETE -> delete an item from cart
// DELETE /item/<item_id>
router.delete('/item/:id', requireToken, (req, res, next) => {
    // get item id from params
    const itemId = req.params.id
    const cartOwner = req.user.id
    // find the pet in the db
    Cart.find({ owner: cartOwner })
        //if a cart is not found
        .then(handle404)
        //cart found
        .then(cart => {
            // get the specific subdocument by its id
            const itemToDelete = cart[0].items.id(itemId)
 
            // require that the deleter is the owner of the cart
            requireOwnership(req, cart[0])
            // call remove on the item we got on the line above requireOwnership
            itemToDelete.remove()

            // // return the saved cart
            return cart[0].save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)
})




module.exports = router