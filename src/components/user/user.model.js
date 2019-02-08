import mongoose from "mongoose";
import bcrypt from "bcrypt";
import DataLoader from "dataloader";

import { appConfig } from "~/config";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function preSaveHook(next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, appConfig.APP.HASH_TIMES);
  }

  next();
});

userSchema.method("checkPassword", async function checkPassword(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
});

function getUserLoader(options = { limit: null, skip: null }) {
  return new DataLoader(userIds =>
    UserModel.find({ _id: { $in: [...new Set(userIds.map(id => id.toString()))] } })
      .limit(options.limit)
      .skip(options.skip)
      .exec()
      .then(users => userIds.map(id => users.find(user => user._id.toString() === id.toString()))),
  );
}

const UserModel = mongoose.model("User", userSchema);

export { getUserLoader, UserModel };
