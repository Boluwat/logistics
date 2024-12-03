import mongoose, { Model, Schema, model } from "mongoose";
import { IUserDocument } from "../../interfaces";

const userSchema = new Schema<IUserDocument>(
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      isActivated: {
        type: Boolean,
        default: false,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      strict: "throw",
      timestamps: true,
      _id: true
    }
  );
  
  interface IUserModel extends Model<IUserDocument> { }
  const User = model<IUserDocument, IUserModel>('User', userSchema);
  
  export default User;
  

