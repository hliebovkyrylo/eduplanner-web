import { MainPage, Home, Schedule, Onboarding } from "./pages";

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/s/:id" element={<Schedule/>} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  )
}

export default App
