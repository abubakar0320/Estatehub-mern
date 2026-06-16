import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'tenant', 'agent', 'user'],
    default: 'user'
  },
  profile_image: {
    type: String,
    default: 'default_user.png'
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', userSchema);

export default User;
