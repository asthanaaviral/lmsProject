import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate token");
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;
