const express = require('express')
const router = new express.Router()
const AdminController = require('../controller/AdminController.js')

const upload = require('../middleware/upload')
const {resize_image} = require('../middleware/resize')
const {VerifyAdminAccessToken} = require('../middleware/AuthMiddleware.js')



router.post('/login', AdminController.AdminLogin);
router.get('/load-user', VerifyAdminAccessToken, AdminController.LoadAdminUser)

router.post('/add-user', VerifyAdminAccessToken, AdminController.AddUser),
router.post('/update-user/:id', VerifyAdminAccessToken, AdminController.UpdateUser)
router.post('/delete-user/:id', VerifyAdminAccessToken, AdminController.DeleteUser)

router.post('/add-product', VerifyAdminAccessToken, AdminController.AddProduct)
router.post('/add-product-image/:id', VerifyAdminAccessToken, upload.single('picture'), resize_image, AdminController.AddProductImage)
router.post('/update-product-image/:id', VerifyAdminAccessToken, upload.single('picture'), resize_image, AdminController.UpdateImage)

// router.post('/add-category', VerifyAdminAccessToken, AdminController.AddCategory)
router.post('/add-producer', VerifyAdminAccessToken, AdminController.AddProducer)
router.post('/update-product/:id', VerifyAdminAccessToken, AdminController.UpdateProduct)
router.post('/accept-order/:id', VerifyAdminAccessToken, AdminController.AcceptOrder)
router.get('/get-order-pdf/:id', VerifyAdminAccessToken, AdminController.CreateOrderPDF)
router.post('/update-in-come/:id/:bool', VerifyAdminAccessToken, AdminController.UpdateNewInCome)
router.post('/delete-product/:id', VerifyAdminAccessToken, AdminController.DeleteProduct)
// router.post('/update-category/:id', VerifyAdminAccessToken, AdminController.UpdateCategory)
router.post('/update-producer/:id', VerifyAdminAccessToken, AdminController.UpdateProducer)

router.get('/get-users',VerifyAdminAccessToken, AdminController.GetUsers)
// router.get('/get-categories', VerifyAdminAccessToken, AdminController.GetAllCategory)
router.get('/get-producers', VerifyAdminAccessToken, AdminController.GetProducers)
router.get('/get-products', VerifyAdminAccessToken, AdminController.GetAllProducts)
router.get('/get-orders',VerifyAdminAccessToken, AdminController.GetOrders)
router.get('/get-order/:id', VerifyAdminAccessToken, AdminController.GetOrderById)


router.post('/send-sms-new-in-come',  AdminController.SendSMSNewInCome)


module.exports = router