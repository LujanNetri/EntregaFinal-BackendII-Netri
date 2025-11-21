import SessionService from "../service/sessions.service.js";
import SessionRepository from "../repository/sessions.repository.js";

class SessionController {

static async register(req, res) {
  try {
    return res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: req.user
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

  static async login(req, res) {
    try {
      const token = await SessionService.login(req.body);
      console.log("TOKEN GENERADO:", token);
      res.cookie("authCookie", token, { httpOnly: true, maxAge: 3600000 });
      return res.redirect("/profile");

    } catch (error) {
      return res.status(error.code || 500).json({ message: error.message });
    }
  }

  static async current(req, res) {
    try {
      const userDTO = SessionRepository.toDTO(req.user);
      res.json({ status: "success", user: userDTO });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async restoredPassword(req, res) {
    try {
      await SessionService.restoredPassword(req.body);
      return res.redirect("/login");
    } catch (error) {
      return res.status(error.code || 500).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      await SessionService.logout(req, res);
      return res.redirect("/");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async sendRecoveryEmail(req,res){
    try {
      console.log("[Controller] BODY:", req.body);
    const result = await SessionService.sendRecoveryEmail(req.body.email);
      res.json({ message: "Se envió un correo con instrucciones" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default SessionController;
