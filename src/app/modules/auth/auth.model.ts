import { model, Schema } from "mongoose";
import { IUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { envs } from "../../config/envs";

const userSchema = new Schema<IUser>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["admin", "user"], default: "user" },
      isBlocked: { type: Boolean, default: false },
   },
   { timestamps: true },
);

userSchema.pre("save", async function (next) {
   // Hash the password before saving the user model

   if (this.isModified("password")) {
      this.password = await bcrypt.hash(
         this.password,
         Number(envs.bcrypt_salt),
      );
   }
   next();
});

userSchema.post("save", function (doc, next) {
   doc.password = "*********";
   next();
});

export const User = model<IUser>("User", userSchema);
