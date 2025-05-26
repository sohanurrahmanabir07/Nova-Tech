const { cloudinary } = require("../Cloudinary/cloudinary")
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
        const data = await Categories.find({}).sort({ createdAt: -1 })
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

    try {
        const files = req.files; // multiple files from multer (images[])
        const infoString = req.body.info;

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString); // parse stringified JSON
        const imageUrl = [];

        // Upload each file to Cloudinary
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrl.push(result.secure_url);
        }

        info.imageUrl = imageUrl;


        if (info.name != '' && info.imageUrl != "") {
            const newProduct = new Products(info);
            const savedProduct = await newProduct.save();

            const products = await Products.find({}).sort({ createdAt: -1 }).lean()

            if (products) {
                res.status(200).send({
                    message: "Product uploaded successfully",
                    data: products,
                });
            }
        } else {
            res.status(500).send({ 'message': 'Multiple Attempt' })
        }




    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }



}

const addCategory = async (req, res) => {
    try {

        const file = req.file
        const name = req.body.name

        console.log('file', file, 'name', name)
        const search = await Categories.find({ name: name }).lean()
        if (search.length > 0) {
            return res.send({
                'message': 'This Category Exists'
            })

        }

        const data = {
            name,
            imageUrl: ''
        }

        await cloudinary.uploader.upload(file.path)
            .then((resp) => {
                data.imageUrl = resp.secure_url
            })
            .catch((error) => {


                res.status(401).send({ message: 'Failed to Upload Please Try Again' })

                return
            }
            )

        const addCategory = new Categories(data)
        const result = await addCategory.save()
        const categories = await Categories.find({}).sort({ createdAt: -1 })


        if (result) {
            res.send({
                'message': 'New Categpory Added',
                data: categories

            })
        }

    } catch (error) {
        res.status(500).send({
            'message': error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.body

        const search = await Categories.find({ _id: id }).lean()
        if (search.length > 0) {

            const dlt = await Categories.deleteOne({ _id: id })
            if (dlt) {
                const data=await Categories.find({}).lean()
                return res.send({
                    'message': 'Category Deleted Successfully',
                    data: data
                })
            } else {
                return res.send({
                    'message': 'Couldnt Delete it'
                })
            }

        }
        return res.send({
            'message': 'Category Doesnt Exist'
        })

    } catch (error) {
        res.status(500).send({
            'message': 'Error Deleting Category'
        })
    }
}

const deleteProduct = async (req, res) => {

    const { id } = req.body
    const del = await Products.findByIdAndDelete(id)
    try {
        if (del) {
            const data = await Products.find({}).lean()
            res.status(200).send({
                "message": "Product Deleted Successfully",
                data:data
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
    getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory
}