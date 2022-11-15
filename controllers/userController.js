const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

exports.createUser = async (req, res) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm // this needs to be changed
    });

    await newUser.save();
    res.redirect('/signUp')
};

  exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id).exec();

      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        params: req.params.id,
        status: 'fail',
        message: err
      });
    }
  };

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json ({ message: 'Unauthorized user!' });
  }
};
