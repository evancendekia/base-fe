import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../pages/User";

const AppRoutes = () => {
  return (
    
    <BrowserRouter>
        <div className="app-wrapper">
            <Header />

            <main className="main-content">
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </main>

            <Footer />
        </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
