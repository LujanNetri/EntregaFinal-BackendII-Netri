import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/carts.controller.js";
import { authorizeOnlyUser } from "../middlewares/authorization.js";
import { validateCartOwner } from "../middlewares/authorization.js";

const router = Router();

router.get("/:cid",passport.authenticate("jwt", { session: false }),validateCartOwner ,CartController.getCartById);

router.post("/", authorizeOnlyUser ,CartController.createCart);

router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), validateCartOwner, CartController.addProductToCart);

router.post("/:cid/purchase", passport.authenticate("jwt", { session: false }),validateCartOwner ,CartController.purchase);

router.delete("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), validateCartOwner,CartController.removeProduct);

router.delete("/:cid",passport.authenticate("jwt", { session: false }), validateCartOwner, CartController.emptyCart);

export default router;