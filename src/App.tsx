import { Home, Schedule, SignIn, SignUp } from "./pages";
import { Route, Routes }                  from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/s/:id"   element={<Schedule/>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default App
