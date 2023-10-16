import React from "react";
import { useDispatch } from "react-redux";
import { MainPage, LoginPage, SignUpPage, CreateSchedulePage, UpdateSchedulePage, Home } from "./pages";

import { Route, Routes } from "react-router-dom";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch<any>(fetchAuthMe());
  }, []);  

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/create" element={<CreateSchedulePage />} />
      <Route path="/schedules/:id/update" element={<UpdateSchedulePage />} />
    </Routes>
  )
}

export default App
