import crypto from "crypto"

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex")
}

export default generateApiKey

