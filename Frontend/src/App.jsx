import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import LandingPage from './Landing/LandingPage';
import Register from './Pages/USER/Register';
import Login from './Pages/USER/Login';
import ForgetPassword from './Pages/USER/ForgetPassword';
import Home from './Pages/USER/Home';

function App() {
  return (
    <GoogleOAuthProvider clientId="898660606570-529a0mv68ho1122fnrj34t2mbo2b7avt.apps.googleusercontent.com"> 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          
          <Route path="/home" element={<Home />} />
          {/* Optional 404 route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
