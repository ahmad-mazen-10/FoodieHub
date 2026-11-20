import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "https://imgs.search.brave.com/ooiWe0g1JIZn37CmkmxDUBbaERVc6MqgW-GuD7gztDA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LmRpcmVjdGtzYS5j/b20vY2RuLWNnaS9p/bWFnZS9mb3JtYXQ9/YXV0byxxdWFsaXR5/PTkwL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzEwLzM2ZjU5/NWNmLTQwMHgyMjUu/anBlZw",
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", categorySchema);
