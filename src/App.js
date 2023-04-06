import SignUp from "./SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";

function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" Component={SignUp}/>
          <Route path="/login" Component={LogIn}/>
          <Route exact path="/" Component={Dashboard}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
