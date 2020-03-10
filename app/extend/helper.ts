
import bcrypt = require('bcryptjs');

exports.bhash = str => {
  return bcrypt.hashSync(str, 10);
};

exports.validateId = str => {
  return /^[a-zA-Z0-9\-_]+$/i.test(str);
};
