import React, { useState } from 'react';

const AccountCreation = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim() || !email.trim() || !phone.trim() || !course.trim()) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const signup = async () => {
    try {
      if (validateInputs()) {
        alert('Creating account...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newUser = { username, email, phone, course, id: Date.now() };
        addUser(newUser);
        alert('Account created successfully!');
      }
    } catch (error) {
      alert(`Error during account creation: ${error.message}`);
    }
  };

  return (
    <div className='flex justify-center items-center h-[80vh] bg-gray-800'>
      <div className='bg-gradient-to-r from-purple-800 to-indigo-800 px-10 py-10 rounded-xl text-white'>
        <div>
          <h1 className='text-center text-3xl mb-6 font-bold'>Welcome! Create an Account</h1>
        </div>

        <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name='username' className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Username'
          />
        </div>
        <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name='email' className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Email'
          />
        </div>
        <div>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name='phone' className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Phone'
          />
        </div>
        <div>
          <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} name='course' className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Course'
          />
        </div>
        <div className='flex justify-center mt-6'>
          <button onClick={signup} className='bg-pink-500 w-full text-white font-bold px-6 py-3 rounded-lg hover:bg-pink-600 transition duration-300'>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
