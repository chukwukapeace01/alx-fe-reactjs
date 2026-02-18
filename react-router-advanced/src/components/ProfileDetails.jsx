import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Details</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default ProfileDetails;