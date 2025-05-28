const express=require('express')
const { getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct, updateCategory } = require('../Controller/Controller')
const { register, login } = require('../Controller/AuthController')
const router=express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.get('/getProducts',getProducts)
router.get('/getCategories',getCategories)
router.post('/addProduct', upload.array('images', 5),addProduct)
router.delete('/deleteProduct',deleteProduct)
router.post('/addCategory',upload.single('image'),addCategory)
router.delete('/deleteCategory',deleteCategory)
router.put('/updateProduct/:id',upload.array('images', 5),updateProduct)
router.put('/updateCategory/:id',upload.single('image',5),updateCategory)

// _________Admin route________________
router.post('/register',register)
router.post('/login',login)
module.exports={
    router
}