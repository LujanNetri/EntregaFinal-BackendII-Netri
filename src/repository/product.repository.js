export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = () => this.dao.getProducts();

  getProductById = (pid) => this.dao.getProductById(pid);

  create = (productData) => this.dao.createProduct(productData);

  updateProduct = (pid, data) => this.dao.updateProduct(pid, data);

  deleteProduct = (pid) => this.dao.deleteProduct(pid);
}