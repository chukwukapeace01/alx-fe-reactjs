import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <div>
      <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
      />
    </div>
  );
}