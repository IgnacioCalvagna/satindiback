const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
    {
        nombre:{
            type:DataTypes.STRING
        },
        apellidos:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            
            
        }
    }, 
    {
        sequelize:db,
        modelName:'users'
    }
    
    );


    module.exports=User
