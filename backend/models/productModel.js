import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: number, required: true },
  image: { type: array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: array, required: true },
  bestSeller: { type: Boolean },
  date: { type: number, required: true },
});


const productModel= mongoose.Model.product||mongoose.model("product",productSchema)
export default productModel