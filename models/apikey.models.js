import mongoose from "mongoose"

const ApiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestCount: {
      type: Number,
      required: true,
      default: 0,
    },
    requestLimit: {
      type: Number,
      required: true,
      default: 1000,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
)

const ApiKey = mongoose.model("ApiKey", ApiKeySchema)
export { ApiKey }

