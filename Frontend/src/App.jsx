import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Explorepage from "./components/ExplorePage/Explorepage";
import HomePage from "./components/HomePage/HomPage";
import House from "./components/ExplorePage/House";
import Edit from "./components/ExplorePage/Edit";
import AddHome from "./components/AddHome/AddHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore-page" element={<Explorepage />} />
          <Route path="/house/:id" element={<House />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add-home" element={<AddHome />} />
          <Route path="/my-profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
