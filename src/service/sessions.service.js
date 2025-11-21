import SessionRepository from "../repository/sessions.repository.js";
import { createHash, isValidPassword, generateToken } from "../utils/index.js";
import jwt from "jsonwebtoken";
import CartRepository from "../repository/cart.repository.js";
import crypto from "crypto";
import EmailService from "../service/email.service.js";
class SessionService {

  static async register(data) {
    const { email, password } = data;

    const userExist = await SessionRepository.getByEmail(email);

    if (userExist)
      return { error: true, code: 400, message: "El correo ya existe" };

    const password_hash = createHash(password);

    const newUser = {
      ...data,
      password: password_hash
    };

    const created = await SessionRepository.create(newUser);

    return { error: false, user: created };
  }

  static async login({ email, password }) {
    const user = await SessionRepository.getByEmail(email);
    if (!user) throw { code: 401, message: "Usuario no encontrado" };

    if (!isValidPassword(password, user.password))
      throw { code: 401, message: "Credenciales incorrectas" };

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }

  static async restorePassword({ email, password }) {
    const user = await SessionRepository.getByEmail(email);

    if (!user)
      return { error: true, code: 404, message: "Usuario no encontrado" };

    const password_hash = createHash(password);
    user.password = password_hash;

    const updated = await SessionRepository.update(user);

    return { error: false, user: updated };
  }

  static async logout(req, res) {
    res.clearCookie("authCookie");

    if (!req.session) 
      return { error: false, message: "Sesión cerrada" };

    return new Promise((resolve) => {
      req.session.destroy(() => {
        resolve({ error: false, message: "Sesión cerrada" });
      });
    });
  }

  static async sendRecoveryEmail(email){
    const user = await SessionRepository.getByEmail(email);

    if(!user)
      return

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await SessionRepository.update(user);

    await EmailService.sendPasswordResetEmail(email, token);

    return true;
  }

  static async restoredPassword({token, password}) {
    const user = await SessionRepository.getByToken(token)

    if(!user)
      return { error: true, code: 400, message: "Token inválido" }; 

    if(user.resetTokenExpiration < Date.now())
      return { error: true, code: 400, message: "El enlace expiró. solicitá uno nuevo." }; 

    const newHash = createHash(password);

    if(newHash === user.password)
      return { error: true, code: 400, message: "No podés usar la misma contraseña anterior" }; 
    
    user.password = newHash;
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await SessionRepository.update(user);

    return true;
  }
  
}

export default SessionService;
