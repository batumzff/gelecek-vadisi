const { sign, verify } = require("jsonwebtoken");

module.exports.generateToken = (user, expiresIn) => {
  return sign(user, process.env.JWT_SECRET, {
    expiresIn,
  });
};

module.exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};
