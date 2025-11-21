import cartModel from "../models/cart.model.js";

export default class CartDao {

  getCart = async (cid) => {
    try {
      return await cartModel.findById(cid).populate("items.product");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createCart = async () => {
    try {
      return await cartModel.create({ items: [] });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return null;

      const item = cart.items.find(i => i.product.toString() === pid);

      if (item) {
        item.quantity++;
      } else {
        cart.items.push({ product: pid, quantity: 1 });
      }

      cart.updatedAt = new Date();
      return await cart.save();

    } catch (error) {
      console.log(error);
      return null;
    }
  };

  removeProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return null;

      cart.items = cart.items.filter(i => i.product.toString() !== pid);

      cart.updatedAt = new Date();
      return await cart.save();

    } catch (error) {
      console.log(error);
      return null;
    }
  };

  emptyCart = async (cid) => {
    try {
      return await cartModel.findByIdAndUpdate(
        cid,
        { items: [], updatedAt: new Date() },
        { new: true }
      );

    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateCart = async (cid, cart) => {
    try {
      return await cartModel.updateOne({ _id: cid }, { $set: cart });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
