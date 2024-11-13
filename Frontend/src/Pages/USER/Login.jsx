import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginBanner from '../../assets/Login.svg'
import Goolge from '../../assets/Google.png'
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 relative">
        <img
          src={LoginBanner}
          alt="Student learning online"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 relative">
        {/* EduSphere Logo for Large Screens */}
        <div className="absolute top-4 right-4 hidden lg:block">
          <h1 className="text-2xl font-bold text-green-500">EduSphere</h1>
        </div>

        {/* EduSphere Logo for Small Screens */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h1 className="text-2xl font-bold text-green-500">EduSphere</h1>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-2 mb-8">
          <div className="flex gap-2 p-1 bg-green-100 rounded-full">
            <button className="px-6 py-2 bg-green-500 text-white rounded-full transition-colors duration-300">
              Login
            </button>
            <button className="px-6 py-2 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-300">
              Register
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Welcome to EduSphere...!</h2>
            <p className="text-gray-600">EduSphere makes you perfect</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                User name
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                placeholder="Enter your User name"
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-green-500 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gray-600 hover:text-green-500">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Login
            </button>

            {/* Divider and Social Login Button */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Sign up with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <img
                src={Goolge}
                alt="Google logo"
                className="w-6 h-6"
              />
              <span className="text-red-600">Google</span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-green-500 hover:underline">
                Sign up free!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
