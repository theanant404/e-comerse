import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  admin:{type:Boolean ,default:false},
  image: {type: String},
  public_id:{type:String},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);