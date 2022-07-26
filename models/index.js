const User = require('./user')
const Product = require('./product')
const Role = require('./Role')


User.belongsTo(Role)


module.exports={User, Product,Role}