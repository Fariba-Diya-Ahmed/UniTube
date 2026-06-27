import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
export default function App(){
    const [dark, setDark]=useState(false);

    return(
        <BrowserRouter>
         <Routes>
            < Route path="/" element={<Home dark={dark} setDark={setDark} /> } />
            <Route path="/login" element={<Login dark={dark} setDark={setDark} />} />
            <Route path="/register" element={<Register dark={dark} setDark={setDark} />} />
            <Route path="/dashboard" element={<Dashboard dark={dark} setDark={setDark} />} />
         </Routes>
        </BrowserRouter>
    )
}