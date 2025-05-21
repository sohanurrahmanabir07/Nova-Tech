const express=require('express')
const { getProducts, addProduct, deleteProduct, getCategories } = require('../Controller/Controller')
const router=express.Router()


router.get('/getProducts',getProducts)
router.get('/getCategories',getCategories)
router.post('/addProduct',addProduct)
router.delete('/deleteProduct',deleteProduct)

module.exports={
    router
}