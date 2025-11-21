import ProductService from "../service/products.service.js";

const productService = new ProductService();

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res) => {
    const products = await this.productService.getProducts();
    res.json({ status: "success", products });
  };

  getProductById = async (req, res) => {
    const { pid } = req.params;
    const product = await this.productService.getProductById(pid);

    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json({ status: "success", product });
  };

  createProduct = async (req, res) => {
    const newProduct = await this.productService.createProduct(req.body);

    if (newProduct?.error)
      return res.status(400).json({ status: "error", message: newProduct.error });

    res.status(201).json({ status: "success", newProduct });
  };

  updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updated = await this.productService.updateProduct(pid, req.body);
    res.json({ status: "success", updated });
  };

  deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const deleted = await this.productService.deleteProduct(pid);
    res.json({ status: "success", deleted });
  };
}

export default new ProductController(productService);
