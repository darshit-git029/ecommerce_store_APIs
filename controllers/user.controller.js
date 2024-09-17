const db = require("../models");
const bcrypt = require('bcrypt');

//get user data from user table
exports.getuserData = async (req, res) => {
  try {
    const user = await db.user.findAll({
      order: [
        ['id', 'ASC'],
      ],
    })
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to get user data from table ' });
  }
};

//get user data by id
exports.getuserDataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const user = await db.user.findOne({
      where: { id: [id] }
    })
    if (!user) {
     return res.status(404).json({ message: `can not find user id ${id}` })
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to get user data from table' });
  }
};

//insert user data in table
exports.insertUserData = async (req, res) => {
  try {
    const { email, firstName, lastName, userName, password, countryCode, phone, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({ email, firstName, lastName, userName, password: hashedPassword, countryCode, phone, address })
    console.log(password);

    return res.status(200).json({ message: 'User created successfully', user })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to insert user data in table' });
  }
};

//update user data 
exports.updateUserData = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { email, firstName, lastName, userName, password, countryCode, phone, address } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.update({ email, firstName, lastName, userName, password: hashedPassword, countryCode, phone, address }, {
      where: { id: id }
    })
    return res.status(200).json({ user, message: `user id ${id} data update successfully` });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error to update user data" });
  }
}

//delete user data from user table
exports.deleteUserData = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await db.user.destroy({
      where: { id: id }
    })
    if (!user) {
      return res.status(404).json({ message: 'user id is not found !! ' });
    }
    return res.status(200).json({ user, message: `user id ${id} deleted successfully` });
  }
  catch (error) {
    return res.status(500).json({ error: 'can not delete user data with this id ' });

  }
}

//limit result for user data
exports.getuserDataLimit = async (req, res) => {
  try {
    const no = parseInt(req.params.no)
    const user = await db.user.findAll({
      limit: no, order: [
        ['id', "asc"],
      ]

    })
    return  res.json({ message: `only ${no} number of user data display `, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to get user data from table' });
  }
};

//sortin user data and display
exports.getuserDataSorting = async (req, res) => {
  try {
    const value = (req.params.value)
    const user = await db.user.findAll({
      order: [
        ['id', value],
      ]
    })
    return res.json({ message: `user data is dispaly in ${value} order `, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error to get user data from table' });
  }
};
