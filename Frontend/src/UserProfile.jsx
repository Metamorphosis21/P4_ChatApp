import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [status, setStatus] = useState('');
  const [theme, setTheme] = useState('light'); // Default theme
  const [userId, setUserId] = useState(null); // Placeholder for user identification

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await axios.get(`/api/user/${userId}`);
        setStatus(userProfile.data.statusMessage || '');
        setTheme(userProfile.data.theme || 'light');
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };
    
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/user/${userId}/update-profile`, {
        statusMessage: status,
        theme
      });
      localStorage.setItem('theme', theme); 
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      
      <div className="mt-4">
        <label className="block mb-2 text-lg">Status Message:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
          maxLength={100}  // Character limit for status message
          placeholder="Enter your status message"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-lg">Select Theme:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Profile
      </button>
    </div>
  );
}
