import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String, 
    price: {type: Number, required: true},
    size: {type: String, enum:["XS","S","M","L","XL"], required: true},
    stock: {type: Number, default: 0},
    category: String,
    Image: String
})

export default model("Product", ProductSchema)
