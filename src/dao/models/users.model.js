import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {type: String,required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  age:{type: Number, default: null},
  password: {type: String, required: true},
  cart: {type: Schema.Types.ObjectId,ref: "Carts"},
  role: {type: String, enum: ["user", "admin"], default: "user" },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date }
});

export default model("User", UserSchema);
