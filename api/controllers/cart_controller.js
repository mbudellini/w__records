const { Cart, DiscogsCollection } = require('../models/models')
const axios = require("axios");

/**
 * Aggiungi un item al carrello dell'utente
 * Richiede: userEmail (header o body), item_id, title, price, quantity
 */
const addToCart = async (req, res) => {
  try {
    const { userEmail, instance_id, id, title, price, quantity = 1, cover_image } = req.body;

    if (!userEmail || !instance_id || !id || !title || !price) {
      return res.json({
        ok: false,
        message: "Missing required fields: userEmail, instance_id, id, title, price"
      });
    }

    // Verifica che l'item esista nella collezione
    const record = await DiscogsCollection.findOne({ instance_id });
    if (!record) {
      return res.json({
        ok: false,
        message: "Item not found in collection"
      });
    }

    // Verifica che l'item non sia già nel carrello di un altro utente
    const inOtherCart = await Cart.findOne({
      "items.instance_id": instance_id,
      userEmail: { $ne: userEmail },
    });
    if (inOtherCart) {
      return res.json({
        ok: false,
        message: "Item is no longer available (already in another user's cart)"
      });
    }

    let cart = await Cart.findOne({ userEmail });

    // Controlla se l'item è già nel carrello dell'utente (1 copia max per instance_id)
    if (cart) {
      const alreadyInCart = cart.items.find(item => item.instance_id === instance_id);
      if (alreadyInCart) {
        return res.json({
          ok: false,
          message: "Item is already in your cart"
        });
      }
    }

    // Ogni instance_id è una singola copia fisica, quantità forzata a 1
    const finalQuantity = 1;

    if (!cart) {
      cart = await Cart.create({
        userEmail,
        items: [{
          instance_id,
          id,
          title,
          price,
          quantity: finalQuantity,
          cover_image,
        }],
        totalPrice: price * finalQuantity,
      });
      return res.json({
        ok: true,
        message: "Item added to new cart",
        data: cart
      });
    }

    cart.items.push({
      instance_id,
      id,
      title,
      price,
      quantity: finalQuantity,
      cover_image,
    });

    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.updated_at = new Date();

    await cart.save();
    res.json({
      ok: true,
      message: "Item added to cart successfully",
      data: cart
    });
  } catch (error) {
    res.json({ 
      ok: false, 
      message: error.message 
    });
  }
};

/**
 * Ottieni il carrello dell'utente
 * Richiede: userEmail (header o query parameter)
 */
const getUserCart = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.json({ 
        ok: false, 
        message: "Missing userEmail parameter" 
      });
    }

    const cart = await Cart.findOne({ userEmail });

    if (!cart) {
      return res.json({ 
        ok: true, 
        message: "Cart is empty or does not exist",
        data: { items: [], totalPrice: 0 }
      });
    }

    res.json({ 
      ok: true, 
      message: "Cart retrieved successfully",
      data: cart 
    });
  } catch (error) {
    res.json({ 
      ok: false, 
      message: error.message 
    });
  }
};

/**
 * Rimuovi un item dal carrello
 * Richiede: userEmail, instance_id dell'item da rimuovere
 */
const removeFromCart = async (req, res) => {
  try {
    const { userEmail, instance_id } = req.body;

    if (!userEmail || !instance_id) {
      return res.json({ 
        ok: false, 
        message: "Missing required fields: userEmail, instance_id" 
      });
    }

    const cart = await Cart.findOne({ userEmail });

    if (!cart) {
      return res.json({ 
        ok: false, 
        message: "Cart not found" 
      });
    }

    // Rimuovi l'item dal carrello
    cart.items = cart.items.filter(item => item.instance_id !== instance_id);

    if (cart.items.length === 0) {
      // Se il carrello è vuoto, eliminalo
      await Cart.deleteOne({ userEmail });
      return res.json({ 
        ok: true, 
        message: "Item removed from cart. Cart is now empty and has been deleted.",
        data: null
      });
    }

    // Ricalcola il totalPrice
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.updated_at = new Date();

    await cart.save();
    res.json({ 
      ok: true, 
      message: "Item removed from cart successfully", 
      data: cart 
    });
  } catch (error) {
    res.json({ 
      ok: false, 
      message: error.message 
    });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
};


