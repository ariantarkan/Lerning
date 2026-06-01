
import mongoose from 'mongoose';
const UserSchema=new mongoose.Schema({username:String,password:String,lastLogin:{type:Date,default:Date.now}});
export default mongoose.model('User',UserSchema);
