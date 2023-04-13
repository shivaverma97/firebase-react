import SignUp from "./SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import ResetPassword from "./ResetPassword"
import UpdateProfile from "./UpdateProfile";

function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" Component={SignUp}/>
          <Route path="/login" Component={LogIn}/>
          <Route exact path="/" Component={PrivateRoutes}>
            <Route exact path="/" Component={Dashboard}/>
          </Route>
          <Route exact path="/updateprofile" Component={PrivateRoutes}>
            <Route path="/updateprofile" Component={UpdateProfile}/>
          </Route>
          <Route path="/resetpassword" Component={ResetPassword}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
