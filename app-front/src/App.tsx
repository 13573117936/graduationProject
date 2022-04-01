import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Mine from "./pages/Mine";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Companys from "./pages/Companys";
import JobDeatil from "./pages/JobDetail";
import CompanyDeatil from "./pages/CompanyDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/jobs/:value" element={<Jobs />} />
        <Route path="/companys/:value" element={<Companys />} />
        <Route path="/jobDetail/:id" element={<JobDeatil />} />
        <Route path="/companyDetail/:id" element={<CompanyDeatil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
