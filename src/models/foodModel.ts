import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "food title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
      min: [0, "price cannot be negative"],
    },
    imageUrl: {
      type: String,
      default: "https://imgs.search.brave.com/ooiWe0g1JIZn37CmkmxDUBbaERVc6MqgW-GuD7gztDA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LmRpcmVjdGtzYS5j/b20vY2RuLWNnaS9p/bWFnZS9mb3JtYXQ9/YXV0byxxdWFsaXR5/PTkwL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzEwLzM2ZjU5/NWNmLTQwMHgyMjUu/anBlZw",
    },
    foodTags: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "restaurant is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Food = mongoose.model("Food", foodSchema);