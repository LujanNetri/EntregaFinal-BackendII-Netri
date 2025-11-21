export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = () => this.dao.getCarts?.();
  getCartById = (cid) => this.dao.getCart(cid);
  createCart = () => this.dao.createCart();

  addProduct = (cid, pid) => this.dao.addProduct(cid, pid);
  removeProduct = (cid, pid) => this.dao.removeProduct(cid, pid);
  emptyCart = (cid) => this.dao.emptyCart(cid);

  updateCart = (cid, data) => this.dao.updateCart(cid, data);
}
