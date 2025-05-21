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
        const data = await Products.aggregate([
            // [optional] sort so that the one you want comes first
            { $sort: { createdAt: -1 } },

            // group by category, picking the first document in each
            {
                $group: {
                    _id: '$category',
                    doc: { $first: '$$ROOT' }
                }
            },

            // replace the output with the actual document
            { $replaceRoot: { newRoot: '$doc' } },

            // now you have one doc per category
        ]);
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
    getProducts, addProduct, deleteProduct, getCategories
}