import { MainPage, LoginPage, SignUpPage, CreateSchedulePage } from "./pages";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/create" element={<CreateSchedulePage />} />
    </Routes>
  )
}

export default App
