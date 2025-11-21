import CartRepository from "../repository/cart.repository.js"
import ProductRepository from "../repository/product.repository.js";
import TicketRepository from "../repository/tickets.repository.js";

import ProductsDao from "../dao/classes/products.dao.js";
import CartDao from "../dao/classes/cart.dao.js";

export default class CartService {
  constructor() {
    this.cartRepository = new CartRepository(new CartDao());
    this.productRepository = new ProductRepository(new ProductsDao());
    this.ticketRepository = new TicketRepository(); 
  }

  getCarts = async () => {
    return await this.cartRepository.getCarts();
  };

  getCartById = async (id) => {
    return await this.cartRepository.getCartById(id);
  };

  createCart = async () => {
    return await this.cartRepository.createCart();
  };

  addProductToCart = async (cartId, productId) => {
    const product = await this.productRepository.getProductById(productId);

    if (!product) return { error: "Producto no existe" };
    if (product.stock <= 0) return { error: "Sin stock" };

    return await this.cartRepository.addProduct(cartId, productId);
  };

  removeProduct = async (cartId, productId) => {
    return await this.cartRepository.removeProduct(cartId, productId);
  };

  emptyCart = async (cartId) => {
    return await this.cartRepository.emptyCart(cartId);
  };

  purchase = async (cartId, purchaserEmail) => {
    const cart = await this.cartRepository.getCartById(cartId);

    if (!cart)
      throw new Error("Carrito no encontrado");

    const productsNoStock = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await this.productRepository.getProductById(item.product);

      if (!product || product.stock < item.quantity) {
        productsNoStock.push(item.product);
        continue;
      }

      product.stock -= item.quantity;
      await this.productRepository.updateProduct(product._id, product);

      totalAmount += product.price * item.quantity;
    }

    let ticket = null;
    if (totalAmount > 0) {
      ticket = await TicketRepository.create({
      amount: totalAmount,
      purchaser: purchaserEmail
    });
    }

    cart.items = cart.items.filter(item =>
      productsNoStock.includes(item.product)
    );

    await this.cartRepository.updateCart(cartId, cart);

    return { ticket, productsNoStock };
  };
}