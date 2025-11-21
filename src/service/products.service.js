import ProductRepository from "../repository/product.repository.js";
import ProductsDao from "../dao/classes/products.dao.js";

export default class ProductService {
  constructor() {
    const productDAO = new ProductsDao();
    this.productRepository = new ProductRepository(productDAO);
  }

  getProducts = async () => {
    return await this.productRepository.getProducts();
  };

  getProductById = async (id) => {
    return await this.productRepository.getProductById(id);
  };

  createProduct = async (data) => {
    return await this.productRepository.create(data);
  };

  updateProduct = async (id, productData) => {
    return await this.productRepository.updateProduct(id, productData);
  };

  deleteProduct = async (id) => {
    return await this.productRepository.deleteProduct(id);
  };
}