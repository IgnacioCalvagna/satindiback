const { DataTypes, Model} = require('sequelize')
const db = require('../db')

class Product extends Model{}

Product.init(
    {
        productName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        linea:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize:db,
        modelName:'products'
    })


module.exports=Product