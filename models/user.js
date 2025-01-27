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
      key: {
        type: String,
        unique: true,
        sparse: true,
      },
      requestCount: {
        type: Number,
        default: 0,
      },
      requestLimit: {
        type: Number,
        default: 1000,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
    emailConfig: {
      user: String,
      pass: String,
    },
  },
  { timestamps: true },
)

const User = mongoose.model("User", UserSchema)
export default User

