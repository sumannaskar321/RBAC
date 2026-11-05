const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret";

const generateToken = async (payload, options= {}) => {
    const expiresIn = options.expiresIn || 30 * 60 // 30 min
    const secret = options.secret || SECRET_KEY;
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

const verifyToken = async (token, options= {}) => {
  const secret = options.secret || SECRET_KEY;
  return jwt.verify(token, secret);
}


module.exports = {
  generateToken,
  verifyToken
};