import {Router} from "express"
import passport from "passport"
import ProductController from "../controllers/products.controller.js"
import { authorizeOnlyAdmin } from "../middlewares/authorization.js"


const router = Router()

router.get("/", ProductController.getProducts)

router.get("/:pid", ProductController.getProductById)

router.post("/", passport.authenticate("jwt", { session: false }),authorizeOnlyAdmin ,ProductController.createProduct)

router.put("/:pid", passport.authenticate("jwt", { session: false }),authorizeOnlyAdmin ,ProductController.updateProduct);

router.delete("/:pid", passport.authenticate("jwt", { session: false }),authorizeOnlyAdmin, ProductController.deleteProduct);

export default router;