import {
    FaLock,
    FaChevronLeft,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaFacebook,
  } from 'react-icons/fa';
import Reset from '../../assets/Reset.jpg'
  export default function ForgetPassword() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle password reset
    };
  
    return (
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex flex-1 lg:flex-row flex-col">
          {/* Left Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gray-100 relative">
            <img
              src={Reset}
              alt="Student studying online"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            {/* Moved Logo Here */}
            <div className="w-full text-right p-4 lg:p-8">
              <h1 className="text-2xl font-bold text-green-500">EduSphere</h1>
            </div>
  
            <main className="flex-1 flex flex-col p-8 lg:p-12 mt-10 lg:mt-16">
              <div className="max-w-md w-full mx-auto space-y-8">
                {/* Title and Instructions */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
                  <p className="mt-4 text-gray-600">
                    Forgot your password? No worries, submit a password reset request and it will be sent to your email.
                  </p>
                </div>
  
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 mt-10">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your E-mail"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                  </div>
  
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaLock className="w-4 h-4" />
                    Reset Password
                  </button>
                </form>
  
                {/* Back to Login */}
                <a
                  href="#"
                  className="flex items-center justify-center text-green-500 hover:text-green-600 transition-colors duration-300 group mt-6"
                >
                  <FaChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to login screen
                </a>
              </div>
            </main>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="bg-black p-8">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <span className="text-xl font-bold text-white">EduSphere</span>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                aria-label="Linkedin"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  