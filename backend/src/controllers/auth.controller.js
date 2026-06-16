import User from '../models/user.model.js';
import ActivityLog from '../models/activityLog.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Identity and credentials required' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid identity detected' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch && password !== user.password) {
       return res.status(401).json({ message: 'Credential mismatch' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await ActivityLog.create({ user_id: user._id, action: 'Operator logged into MERN system' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        profile_image: user.profile_image
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ message: 'Identity or Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'tenant'
        });

        res.status(201).json({ message: 'Identity successfully created', userId: newUser._id });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Error during identity creation' });
    }
};

export const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const user_id = req.user.id;
  
  try {
    const updateData = { username, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updateData.profile_image = req.file.path.replace(/\\/g, '/');
    }

    const updatedUser = await User.findByIdAndUpdate(user_id, updateData, { new: true });
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        profile_image: updatedUser.profile_image
      }
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
