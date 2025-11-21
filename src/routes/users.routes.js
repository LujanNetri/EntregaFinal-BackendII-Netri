import {Router} from "express"
import UserController from "../controllers/users.controller.js";
import passport from "passport";
import { authorizeOnlyAdmin, authorizeUserOrAdmin } from "../middlewares/authorization.js";

const router = Router()

router.get("/", passport.authenticate("jwt", { session: false }), authorizeOnlyAdmin ,UserController.getUsers)

router.get("/:uid", passport.authenticate("jwt", { session: false }), authorizeUserOrAdmin,UserController.getUserById)

router.post("/", UserController.createUser)

router.put("/:uid",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser
)

router.delete("/:uid", passport.authenticate("jwt", { session: false }), UserController.deleteUser
);

export default router;