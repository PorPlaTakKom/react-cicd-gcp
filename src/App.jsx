import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleSocialLogin = (provider) => {
    // You can implement social login logic here
    console.log('Logging in with', provider);
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </form>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-between items-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            type="button"
            onClick={() => handleSocialLogin('Google')}
          >
            Google
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2"
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
