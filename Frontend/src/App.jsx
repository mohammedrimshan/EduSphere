import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider
import LandingPage from './Landing/LandingPage';
import Register from './Pages/USER/Register';
import Login from './Pages/USER/Login';
import ForgetPassword from './Pages/USER/ForgetPassword';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Wrap your app here */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
