import { Router } from "express";
import SessionController from "../controllers/sessions.controller.js";
import { authorizeOnlyAdmin } from "../middlewares/authorization.js";
import passport from "passport";


const router = Router();
router.post(
  "/register",
  (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
      if (err) 
        return next(err);

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: info?.message || "El usuario ya existe"
        });
      }

      req.user = user;
      return next(); 
    })(req, res, next);
  },
  SessionController.register
);

router.post("/login", SessionController.login);

router.get("/current",passport.authenticate("jwt", { session: false }),SessionController.current);

router.post("/recover", SessionController.sendRecoveryEmail);
router.post("/restore", SessionController.restoredPassword);

router.post("/logout", SessionController.logout);

export default router;