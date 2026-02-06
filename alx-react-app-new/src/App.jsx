import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <div>
      <Header />
      <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
      />
      <MainContent />
      <Footer />
    </div>
  );
}