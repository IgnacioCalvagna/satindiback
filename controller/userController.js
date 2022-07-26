const User = require("../models/user");

exports.add = async (req, res, next) => {
  try {
      const RoleId =1
    const newUser = await User.create(req.body,RoleId);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    User.update(req.body, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    }).then(result => {
      const user = result[1];
      res.status(201).json({
        user,
      });
    });
}

exports.me = (req, res) => {
    if (!req.user) return res.sendStatus(401);
    res.send(req.user);
  };
  
  exports.login = (req, res,next) => {
    
        res.send(req.user).then(()=>console.log("Me logie"));
        
    
  };

  exports.logout = (req, res) => {
    req.logOut();
    res.sendStatus(200);
  };
  