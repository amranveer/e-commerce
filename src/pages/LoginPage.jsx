import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/thunks/authThunks";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Formik Hook
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(login({ email: values.email, password: values.password })).unwrap();
        navigate('/');
      } catch (err) {
        console.error(`Error while logging in: ${err}`);
        // Optionally show toast or notification here
      }
    },
  });

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="pt-8 px-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Welcome Back
          </h2>

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}

            {/* Password */}
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}

            {/* Forgot Password */}
            <div className="flex items-center mb-6 mt-2">
              <Link to="/forgot-password" className="text-sm text-gray-100 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Error from Redux */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm mt-2 text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-white text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
            </motion.button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="px-8 mb-4 py-4 bg-gray-800 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-200 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
