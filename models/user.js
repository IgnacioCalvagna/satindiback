const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt');

class User extends Model {
    setHash(password, salt) {
        return bcrypt.hash(password, salt);
      }
}

User.init(
    {
        nombre:{
            type:DataTypes.STRING
        },
        apellido:{
            type:DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: 'Debe ingresar una direccion de correo valida',
              },
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          salt: {
            type: DataTypes.STRING,
          },
    }, 
    {
        sequelize:db,
        modelName:'users'
    }
    
    );
    User.addHook('beforeCreate', user => {
        return bcrypt
          .genSalt(16)
          .then(salt => {
            user.salt = salt;
            return user.setHash(user.password, salt);
          })
          .then(hash => {
            user.password = hash;
          });
      });
      

    module.exports=User
