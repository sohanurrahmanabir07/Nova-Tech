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
const updateProduct = async (req, res) => {
    try {
        const files = req.files || [];
        const infoString = req.body.info;
        const existingImages = req.body.existingImages || [];

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString);
        console.log('data', info)


        const imageUrl = [];

        // Add existing image URLs (if any)
        if (typeof existingImages === 'string') {
            imageUrl.push(existingImages); // handle single string case
        } else if (Array.isArray(existingImages)) {
            imageUrl.push(...existingImages);
        }

        // Upload new images to Cloudinary (if any)
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrl.push(result.secure_url);
        }

        // Append combined image URLs to info
        info.imageUrl = imageUrl;


        // Update the product in DB
        if (info.name && imageUrl.length) {
            const updatedProduct = await Products.findByIdAndUpdate(
                req.params.id,
                info,
                { new: true }
            );

            const products = await Products.find({}).sort({ createdAt: -1 }).lean();

            if (products) {
                return res.status(200).send({
                    message: "Product updated successfully",
                    data: products,
                });
            }
        } else {
            return res.status(400).send({ message: "Missing name or images" });
        }

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};


const addCategory = async (req, res) => {
    try {

        const file = req.file
        const name = req.body.name

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
                const data = await Categories.find({}).lean()
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
const updateCategory = async (req, res) => {
    try {
        const file = req.file; // multer.single('image') should be used in route
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Missing category name" });
        }

        let imageUrl = req.body.existingImage; // current image URL (string)

        // If new file is uploaded, replace the image URL
        if (file) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrl = result.secure_url;
        }

        // Update category
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { name, imageUrl },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Fetch updated list
        const allCategories = await Categories.find({}).sort({ createdAt: -1 }).lean();

        return res.status(200).send({
            message: "Category updated successfully",
            data: allCategories,
        });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {

    const { id } = req.body

    const del = await Products.deleteOne({ _id: id })
    try {
        if (del) {
            const data = await Products.find({}).lean()
            res.status(200).send({
                "message": "Product Deleted Successfully",
                data: data
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



module.exports = {
    getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct,updateCategory
}