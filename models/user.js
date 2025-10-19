const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

userSchema.statics.register = async function(username, password, name) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return this.create({ username, passwordHash, name });
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
