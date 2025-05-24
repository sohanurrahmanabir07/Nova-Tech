const { Categories } = require("../Model/Categories")
const { Products } = require("../Model/Prodcuts")

const getProducts = async (req, res) => {

    try {
        const data = await Products.find({}).lean()
        res.send(data)
    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}
const getCategories = async (req, res) => {
    try {
        const data = await Categories.find({}).sort({createdAt:-1})
        if (data) {
            res.send(data)
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }
}

// __________Add Products_______________________

const addProduct = async (req, res) => {
    // res.send(req.body)
    try {
        const add = new Products(req.body)
        const result = await add.save()

        if (result) {
            res.status(201).send({
                "message": "Inserted Successfully"
            })
        } else {
            res.status(503).send({
                "message": "Error Occured"
            })
        }
    } catch (error) {
        res.status(500).send({
            "message": "A Error Occured"
        })
    }


}

const addCategory=async (req,res)=>{
    try {

        const {name,imageUrl}=req.body

        const search=await Categories.find({name:name}).lean()
        if(search.length>0){
           return res.send({
                'message':'This Category Exists'
            })
            
        }
        const addCategory=new Categories({name,imageUrl})

        const result=addCategory.save()
        if(result){
            res.send({
                'message':'New Categpory Added'
            })
        }
        
    } catch (error) {
        res.status(500).send({
             'message':'Error Making New Category'
        })
    }
}

const deleteCategory=async (req,res)=>{
    try {

        const {id}=req.body

        const search=await Categories.find({_id:id}).lean()
        if(search.length>0){
          
            const dlt=await Categories.deleteOne({_id:id})
            if(dlt){
               return res.send({
                    'message':'Category Deleted Successfully'
                })
            }else{
               return res.send({
                    'message':'Couldnt Delete it'
                })
            }
            
        }
        return res.send({
            'message':'Category Doesnt Exist'
        })
        
    } catch (error) {
        res.status(500).send({
             'message':'Error Deleting Category'
        })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.body.id

    const del = await Products.findByIdAndDelte(id)
    try {
        if (del) {
            res.status(200).send({
                "message": "Product Deleted Successfully"
            })
        } else {
            res.status(403).send({
                "message": "Couldn't Delete it"
            })
        }

    } catch (error) {
        res.send(error.message)
    }

}

const updateProduct = async (req, res) => {
    const { id, name, model, release, description, imageUrl, techSpec } = req.body
    const update = await updateOne({ _id: id }, { name, model, release, description, imageUrl, techSpec })

    try {
        if (update) {
            res.send({
                "message": "Update successfull"
            })
        } else {
            res.send({
                "message": "Error in Updating"
            })
        }
    } catch (error) {
        res.send({
            "message": error.message
        })
    }

}

module.exports = {
    getProducts, addProduct, deleteProduct, getCategories,addCategory,deleteCategory
}