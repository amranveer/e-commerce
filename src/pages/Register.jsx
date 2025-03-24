import React, { useContext } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const inputStyle =
  "w-full p-3 mt-6 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 shadow-sm";

const buttonStyle =
  "w-full py-3 mt-6 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95";


const Register = () => {
    const { setUser} = useContext(UserContext)
    const navigate = useNavigate();
 
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Minimum 3 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs p-10 bg-gray-50 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Register
        </h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setUser(values)
            localStorage.setItem("users", JSON.stringify(values))
            navigate('/login')
          }}
        >
          {() => (
            <Form>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className={inputStyle}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={inputStyle}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={inputStyle}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={inputStyle}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button type="submit" className={buttonStyle}>
                Register
              </button>

              <p className="text-center mt-4">
                Already Registered? 
                <Link to="/login">
                <span className="underline ml-2 cursor-pointer">Login</span>
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
