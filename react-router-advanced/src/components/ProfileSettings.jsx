import { useState } from 'react';

const ProfileSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <h2>Profile Settings</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          {' '}Enable Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          {' '}Dark Mode
        </label>
      </div>
      <button
        onClick={() => alert('Settings saved!')}
        style={{ marginTop: '1rem', padding: '0.5rem 1.2rem', cursor: 'pointer' }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default ProfileSettings;