// backend/controllers/user.controller.js

import { User } from '../models/user.models.js';

// Controller to update user profile (statusMessage and theme)
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { statusMessage, theme } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's status message and theme
    user.statusMessage = statusMessage || user.statusMessage;
    user.theme = theme || user.theme;

    await user.save(); // Save changes

    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
