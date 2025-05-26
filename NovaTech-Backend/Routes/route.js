const express=require('express')
const { getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory } = require('../Controller/Controller')
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

// _________Admin route________________
router.post('/register',register)
router.post('/login',login)
module.exports={
    router
}