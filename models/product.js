const { DataTypes, Model} = require('sequelize')
const db = require('../pg')

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
        modelName:'product'
        
    })


module.exports=Product