import usersModel from "../models/users.model.js";

export default class UsersDAO {
  async getUsers() {
    try {
      return await usersModel.find();
    } catch (error) {
      console.error("DAO getUsers:", error);
      return null;
    }
  }

  async getUserById(uid) {
    try {
      return await usersModel.findById(uid);
    } catch (error) {
      console.error("DAO getUserById:", error);
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      return await usersModel.findOne({ email });
    } catch (error) {
      console.error("DAO getUserByEmail:", error);
      return null;
    }
  }

  async createUser(userData) {
    try {
      return await usersModel.create(userData);
    } catch (error) {
      console.error("DAO createUser:", error);
      return null;
    }
  }

async updateUser(uid, userData) {
  try {
    return await usersModel.findByIdAndUpdate(uid, userData, { new: true });
  } catch (error) {
    console.error("DAO updateUser:", error);
    return null;
  }
}

  async deleteUser(uid) {
    try {
      return await usersModel.deleteOne({ _id: uid });
    } catch (error) {
      console.error("DAO deleteUser:", error);
      return null;
    }
  }

  async getUserByToken(token) {
    return await usersModel.findOne({ resetToken: token });
  }
}