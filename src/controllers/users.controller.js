import UserService from "../service/users.service.js";
import UserRepository from "../repository/user.repository.js";
import UsersDAO from "../dao/classes/user.dao.js"

const userDao = new UsersDAO();
const userRepository = new UserRepository(userDao);
const userService = new UserService();

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUsers = async (req, res) => {
    const users = await this.userService.getUsers();
    res.json({ status: "success", users });
  };

  getUserById = async (req, res) => {
    const { uid } = req.params;
    const user = await this.userService.getUserById(uid);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ status: "success", user });
  };

  createUser = async (req, res) => {
    const newUser = await this.userService.createUser(req.body);

    if (newUser?.error) {
      return res.status(400).json({ status: "error", message: newUser.error });
    }

    res.status(201).json({ status: "success", newUser });
  };

  updateUser = async (req, res) => {
    const { uid } = req.params;
    const updated = await this.userService.updateUser(uid, req.body);
    res.json({ status: "success", updated });
  };

deleteUser = async (req, res) => {
    const { uid } = req.params;

    const result = await this.userService.deleteUser(uid);

    if (!result) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }

    res.json({ status: "success", message: "Usuario borrado con éxito" });
  };

}

export default new UserController(userService)