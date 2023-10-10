import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Authenticator() {
  return (
    <div className='auth'>
      <Login/>
      <Register/>
    </div>
  );
}