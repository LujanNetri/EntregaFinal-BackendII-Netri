import { connect } from "mongoose";

export const connectDb = async (url) => {
  try {
    await connect(url);
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("error de conexion");
  }
};

