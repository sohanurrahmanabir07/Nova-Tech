const mongoose=require('mongoose')

const Schema=mongoose.Schema

const CategorySchema=Schema({

    name:String,
    imageUrl:String,
    
},
{
    timestamps:true
}
)

const Categories=mongoose.model('categories',CategorySchema)

module.exports={
    Categories
}