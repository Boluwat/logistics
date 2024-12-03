import mongoose, {  Model } from 'mongoose';
import { IUserDocument } from "../../interfaces";

type UserModel = Model<IUserDocument>;

const validateUser = async function (val: string): Promise<boolean> {
  const User: UserModel = mongoose.model<IUserDocument>('User');
  try {
    const user: IUserDocument | null = await User.findById(val);
    return Boolean(user);
  } catch (ex) {
    return false;
  }
}

export default validateUser;