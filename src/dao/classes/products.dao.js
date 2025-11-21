import productModel from "../models/products.model.js";

export default class ProductsDao {
    getProducts = async () => {
        try {
            return await productModel.find();
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getProductById = async (pid) => {  
        try {
            return await productModel.findById(pid);  
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    createProduct = async (product) => {
        try {
            return await productModel.create(product);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    updateProduct = async (pid, product) => {
        try {
            return await productModel.findByIdAndUpdate(pid, product, { new: true });
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteProduct = async (pid) => {
        try {
            return await productModel.findByIdAndDelete(pid);  
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
