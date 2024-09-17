const db = require("../models");

//get cart data from user table
exports.getcartData = async (req, res) => {
  try {
    const cart = await db.cart.findAll({
      order: [
        ['id', 'ASC'],
      ], include: [
        {
          model: db.user,
          as: 'user_id',
          attributes: ["id", "userName"]
        },
      ]
    })
    return res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({  message : 'error to get data form table'});
  }
};

//post data in cart 
exports.insertcartdata = async (req, res) => {
  try {
  
    const { userID, total } = req.body;
    const user = await db.user.findOne({ where: { id: userID } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found, cannot add cart data" });
    }
    const cart = await db.cart.create({ userID, total })
    
    return res.status(201).json({ message: "cart data insertd successfully", cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'error to insert cart data in table.' });
  }
}

//delete cart data from user table
exports.deleteCart = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cart = await db.cart.destroy({
      where: { id: id }
    })
    if (!cart) {
      return  res.status(404).json({ message: 'cart data is not found !! ' });
    }
    return res.status(200).json({ cart, message: `cart data id ${id} deleted successfully` });
  }
  catch (error) {
    return res.status(500).json({ error: 'can not delete cart data with this id ' });
  }
}

//get cart-item data from user table
exports.getcartitemData = async (req, res) => {
  try {
    const cartitem = await db.cartItem.findAll({
      order: [
        ['id', 'ASC'],
      ], include: [
        {
          model: db.Product,
          as: 'Products',
          attributes: ["title", "price", "description"]

        },
      ]
    })

    return res.json(cartitem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : 'error to get data from table'});
  }
};

//get only one cart-item data using id 
exports.getcartitemDataById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const cartItem = await db.cartItem.findOne({
      where: { id: [id] },
      include: [
        {
          model: db.Product,
          as: 'Products',
          attributes: ["title", "price", "description"]
        },
      ]
    });

    if (!cartItem) {
      return  res.status(500).json({ message: 'Can not find cart item data with this id ' });
    }

    return res.status(200).json(cartItem);

  } catch (error) {
    console.log(error);
    return  res.status(500).json({ message: 'error to get cart item data from table' });
  }
}

//post data in cart item
exports.insertcartitem = async (req, res) => {
  try {
    const { cartID, productID, quantity } = req.body;
    let cartItem = await db.cartItem.create({ cartID, productID, quantity })

    return  res.status(201).json({ message: "cart item data insertd successfully", cartItem });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'error to insert cart item data' });
  }
}

//update cart-item data using id 
exports.updatecartItemData = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const cartItem = await db.cartItem.update({ productID: req.body.productID, quantity:req.body.quantity}, {
      where: { id: id }
    })
    return res.status(200).json({ cartItem, message: `cart item id ${id} data updated successfully` });

  } catch (error) {
    console.log(error);
    return res.status(500).json({message : "error to update cart item data from table"});
  }
}

//delete cart-item data from user table
exports.deleteCartItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cartItem = await db.cartItem.destroy({
      where: { id: id }
    })
    if (!cartItem) {
      return   res.status(404).json({ message: 'cart item data is not found !! ' });
    }
    return res.status(200).json({ cartItem, message: `cart item data id ${id} deleted successfully` });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'can not delete cart-item data with this id ' });

  }
}
