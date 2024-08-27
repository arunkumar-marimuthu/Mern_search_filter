import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
       
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
