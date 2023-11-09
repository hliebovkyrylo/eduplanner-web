import { MainPage, CreateSchedulePage, UpdateSchedulePage, Home, Schedule, Onboarding } from "./pages";

import { Route, Routes } from "react-router-dom";

function App() {

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
