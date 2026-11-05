const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true},
    password: { type: String, required: true, select: false },
    role: { type: Number, default: 0 }, // 0-> Normal user, 1-> Admin, 2-> Subadmin, 3 -> Editor
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret){
        delete ret.password;
        return ret;
      }
    },
    toObject: {
      transform(doc, ret){
        delete ret.password;
        return ret;
      } 
    }
  },
);

module.exports = mongoose.model('User', userSchema);
