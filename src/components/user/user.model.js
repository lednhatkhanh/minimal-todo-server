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

const UserModel = mongoose.model("User", userSchema);

function getUserLoader() {
  return new DataLoader(userIds =>
    UserModel.find({ _id: { $in: [...new Set(userIds.map(id => id.toString()))] } })
      .exec()
      .then(users => userIds.map(userId => users.find(user => user.id === userId.toString()))),
  );
}

export { getUserLoader, UserModel };
