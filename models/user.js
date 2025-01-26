import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    apiKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model("User", UserSchema)
export default User

