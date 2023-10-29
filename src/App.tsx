import React from "react";
import { useDispatch } from "react-redux";
import { MainPage, CreateSchedulePage, UpdateSchedulePage, Home, Schedule, Onboarding } from "./pages";

import { Route, Routes } from "react-router-dom";
import { fetchUser } from "./redux/slices/user";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const dispatch = useDispatch();
  const { user } = useAuth0();

  React.useEffect(() => {
    dispatch<any>(fetchUser(user?.id));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateSchedulePage />} />
      <Route path="/schedules/:id/update" element={<UpdateSchedulePage />} />
      <Route path="/schedule/:id" element={<Schedule/>} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  )
}

export default App
