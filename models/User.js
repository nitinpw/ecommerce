import { Schema, model, models } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unqiue: true,
    },
    avatar: {
      url: {
        type: String,
        trim: true,
      },
      public_id: {
        type: String,
        trim: true,
      }
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Number,
      trim:true,
    },
    address: {
      type: String,
      trim: true,
    },
    deletedAt:{
      type: Date,
      default: null,
      index: true
    },
},{timestamps: true}
);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods = {
  comparePassword: async function (password){
    return await bcrypt.compare(password, this.password)
  }
}

const User = models?.User || model('User', userSchema);

export default User;