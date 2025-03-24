import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


const inputStyle =
  "w-full p-3  mt-6 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 shadow-sm";

const buttonStyle =
  "w-full py-3 mt-6 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95";

const Login = () => {
    const Navigate = useNavigate()
    const {user} = useContext(UserContext)
    const token = "1234567890"

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs p-10 bg-gray-50 rounded-xl shadow-lg ">
        <h2 className="text-2xl font-bold text-black text-center mb-4">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
        //    if(values.email === user.email && values.password === user.password){
                 
        //   } else {
        //       alert("Login Failed");
        //   }
          }}
        >
          {() => (
            <Form>
              <Field type="email" name="email" placeholder="Email" className={inputStyle} />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />

              <Field type="password" name="password" placeholder="Password" className={inputStyle} />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

              <button type="submit" className={buttonStyle}>Login</button>
              <p className="text-center mt-4">
                New User ? 
                <Link to="/register">
                <span className="underline ml-2 cursor-pointer">Register</span>
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
