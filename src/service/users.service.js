import UserRepository from "../repository/user.repository.js";
import UserDAO from "../dao/classes/user.dao.js";
import { createHash } from "../utils/index.js";
import CartsRepository from "../repository/cart.repository.js";
import CartDao from "../dao/classes/cart.dao.js";

const cartsRepository = new CartsRepository(new CartDao());

export default class UserService {
  constructor() {
    const userDAO = new UserDAO(); 
    this.userRepository = new UserRepository(userDAO);
  }

  getUsers = async () => {
    return await this.userRepository.getUsers();
  };

  getUserById = async (uid) => {
    return await this.userRepository.getUserById(uid);
  };

  createUser = async (userData) => {
    const {email, password} = userData

    if (!email || !password) {
      return { error: "Email y password son obligatorios" };
    }
    const hashedPassword = createHash(password);

    const newUser = {
      ...userData,
      password: hashedPassword, 
    }

    if (userData.role !== "admin") {
      const cart = await cartsRepository.createCart();

      if (!cart) {
        console.error("No se pudo crear el carrito para el usuario");
      } else {
        newUser.cart = cart._id;
      }
    }
    return await this.userRepository.createUser(newUser)
  };

  updateUser = async (uid, userData) => {
    if (userData.password) {
      userData.password = createHash(userData.password);
    }
    return await this.userRepository.updateUser(uid, userData);
  
};

  async deleteUser(uid) {
    return await this.userRepository.deleteUser(uid);
}
}