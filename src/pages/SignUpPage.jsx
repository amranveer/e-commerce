// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { User, Mail, Lock, Loader } from "lucide-react";
// import Input from "../components/Input";
// import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
// import { useAuthStore } from "../store/authstore";

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const { signup, error, isLoading } = useAuthStore(); // Auth store

//   // ✅ Validation Schema
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Full Name is required"),
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   // ✅ Formik Hook
//   const formik = useFormik({
//     initialValues: { name: "", email: "", password: "", confirmPassword: "" },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         await signup(values.email, values.password, values.name);
//         navigate("/verify-email");
//       } catch (err) {
//         console.error(`Error while registering user: ${err}`);
//       }
//     },
//   });

//   return (
//     <div className="bg-white w-full min-h-screen flex items-center justify-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8"
//       >
//         <h2 className="text-2xl text-gray-100 font-bold mb-6 text-center">Create Account</h2>

//         {/* ✅ Formik Form */}
//         <form onSubmit={formik.handleSubmit}>
//           {/* Name Input */}
//           <Input
//             icon={User}
//             type="text"
//             placeholder="Full Name"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
            
//           />
//           {formik.touched.name && formik.errors.name && (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
//           )}

//           {/* Email Input */}
//           <Input
//             icon={Mail}
//             type="text"
//             placeholder="Email Address"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <p className="text-red-500 text-sm mt-1 mb-1">{formik.errors.email}</p>
//           )}

//           {/* Password Input */}
//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="Password"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
//           )}

          

//           {/* Confirm Password Input */}
//           <Input
//             icon={Lock}
//             type="password"
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             value={formik.values.confirmPassword}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
//           )}

//           {/* ✅ Authentication Error Message (Backend Error) */}
//           {error && (
//             <motion.p
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="text-red-500 text-sm mt-2 text-center"
//             >
//               {error}
//             </motion.p>
//           )}
//          {/* Password Strength Meter */}
//          <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: formik.values.password ? "auto" : 0, opacity: formik.values.password ? 1 : 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden"
//           >
//             <PasswordStrengthMeter password={formik.values.password} />
//           </motion.div>
//           {/* Submit Button */}
//           <motion.button
//             className="mt-5 w-full py-3 px-4 bg-gray-100 text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
//             whileTap={{ scale: 0.98 }}
//             whileHover={{ scale: 1.02 }}
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
//           </motion.button>
//         </form>

//         <div className="px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <p className="text-sm text-gray-200">
//             Already have an account?{" "}
//             <Link to="/login" className="text-gray-100 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;
