const express = require('express')
const router = new express.Router()
const {VerifyUserAccessToken} = require('../middleware/AuthMiddleware.js')
const UserController = require('../controller/UserController.js')

router.post('/login', UserController.UserLogin)
router.post('/refresh', UserController.UserRefresh)

router.get('/get-products', VerifyUserAccessToken, UserController.GetProducts)
router.get('/get-product/:id', VerifyUserAccessToken, UserController.GetProductById)
// router.get('/get-categories', VerifyUserAccessToken, UserController.GetCategories)
router.get('/get-producers', VerifyUserAccessToken, UserController.GetProducers)
// router.get('/products-of-category/:id', VerifyUserAccessToken, UserController.GetCategoryProducts)

// router.post('/add-to-cart/:id', VerifyUserAccessToken, UserController.AddToCart)
// router.post('/remove-cart-item/:cart_id/:product_id', VerifyUserAccessToken, UserController.RemoveFromCart)
router.post('/create-order/:payment_id', VerifyUserAccessToken, UserController.CreateOrder)
// router.get('/get-cart-products', VerifyUserAccessToken, UserController.GetCartProducts)
router.get('/get-orders', VerifyUserAccessToken, UserController.GetOrders)
router.get('/get-order/:id', VerifyUserAccessToken, UserController.GetOrderById)
router.post('/update-cart-product/:cart_id/:product_id', VerifyUserAccessToken,  UserController.UpdateCartProduct)
router.post('/get-cart-products', VerifyUserAccessToken, UserController.GetCartProducts)


router.post('/add-to-notifications/:id', VerifyUserAccessToken, UserController.AddNotification)
router.post('/remove-from-notifications/:id', VerifyUserAccessToken, UserController.RemoveFromNotifications)
router.get('/get-notifications', VerifyUserAccessToken, UserController.GetNotifications)


module.exports = router