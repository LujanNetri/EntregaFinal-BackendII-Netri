import CartService from "../service/carts.service.js";

const cartService = new CartService();

class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  getCarts = async (req, res) => {
    const carts = await this.cartService.getCarts();
    res.json({ status: "success", carts });
  };

  getCartById = async (req, res) => {
    const { cid } = req.params;
    const cart = await this.cartService.getCartById(cid);

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.json({ status: "success", cart });
  };

  createCart = async (req, res) => {
    const cart = await this.cartService.createCart();
    res.status(201).json({ status: "success", cart });
  };

  addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const result = await this.cartService.addProductToCart(cid, pid);

    if (result?.error)
      return res.status(400).json({ status: "error", message: result.error });

    res.json({ status: "success", result });
  };

  removeProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const result = await this.cartService.removeProduct(cid, pid);
    res.json({ status: "success", result });
  };

  emptyCart = async (req, res) => {
    const { cid } = req.params;
    const result = await this.cartService.emptyCart(cid);
    res.json({ status: "success", result });
  };

  purchase = async (req,res) =>{
    try {
      const {cid} = req.params;
      const purchaserEmail = req.user.email;
      
      const result = await this.cartService.purchase(cid, purchaserEmail);

      return res.status(200).json({status: "success", ticket: result.ticket, productsNoStock: result.productsNoStock})
    } catch (error) {
      return res.status(500).json({status: "error", message: error.message});
    }
  }
}

export default new CartController(cartService);