import UsersDAO from "../dao/classes/user.dao.js";
import UserDTO from "../dto/user.dto.js";

const usersDAO = new UsersDAO();

export default class SessionRepository {

  static async getByEmail(email) {
    const user = await usersDAO.getUserByEmail(email);
    return user;
  }

  static async getById(id) {
    const user = await usersDAO.getUserById(id);
    return user;
  }

  static async create(data) {
    return await usersDAO.createUser(data);
  }

  static async update(user) {
    return await usersDAO.updateUser(user._id, user);
  }

  static toDTO(user) {
    return new UserDTO(user);
  }

  static async getByToken(token) {
    return await usersDAO.getUserByToken(token);
  }
}