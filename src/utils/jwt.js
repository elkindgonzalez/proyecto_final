const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'clave_super_segura';
const ALG = process.env.JWT_ALG || 'HS256';
const EXPIRES_IN = process.env.JWT_EXPIRES || '1h';

function sign(payload) {
  return jwt.sign(payload, SECRET, { algorithm: ALG, expiresIn: EXPIRES_IN });
}

function verify(token) {
  return jwt.verify(token, SECRET, { algorithms: [ALG] });
}

module.exports = { sign, verify };
