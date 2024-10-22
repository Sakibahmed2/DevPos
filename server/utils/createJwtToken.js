import jwt from "jsonwebtoken";

export const createJwtToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};
