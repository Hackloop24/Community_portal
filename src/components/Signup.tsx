import welcome from "../assets/welcome.jpg";
import google from "../assets/google.png";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "../firebase/setup";
import { useState } from "react";
import EmailSignup from "./EmailSignup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [emailSignup, setEmailSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Google Sign-In Handler
  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in successfully");
      setTimeout(() => {
        if (auth?.currentUser) navigate("/main");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Error signing in with Google");
    }
  };

  // Email/Password Login Handler
  const login = async () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      if (data?.user?.emailVerified) {
        toast.success("Logged in successfully");
        setTimeout(() => navigate("/main"), 2000);
      } else {
        toast.error("Email not verified. Please verify your email.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Error logging in. Please check your credentials.");
      }
    }
  };

  // Forgot Password Handler
  const forgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Error sending password reset email.");
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div
        style={{
          backgroundImage: `url(${welcome})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
        className="flex items-center justify-center bg-opacity-90"
      >
        <div className="bg-gray-800 h-11/12 w-7/12 rounded-md p-8 shadow-xl text-white">
          <h1 className="text-blue-400 text-6xl font-bold font-sans text-center">
            GovAlert
          </h1>
          <h2 className="text-center font-medium text-gray-400 mt-3">
            A place to solve issues
          </h2>
          <div className="flex mt-10">
            {/* Left Section */}
            <div>
              <p className="text-gray-400 text-sm w-72">
                By continuing, you indicate that you agree to GovAlert’s{" "}
                <span className="text-blue-400 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-400 cursor-pointer">
                  Privacy Policy.
                </span>
              </p>
              <div
                onClick={googleSignin}
                className="cursor-pointer flex p-3 border border-gray-600 items-center w-80 rounded-md mt-5 hover:bg-gray-700"
              >
                <img src={google} className="w-5 h-5 ml-2" alt="Google Logo" />
                <p className="ml-7">Continue with Google</p>
              </div>
              <p
                onClick={() => setEmailSignup(true)}
                className="text-center text-sm font-medium text-gray-300 mt-3 hover:bg-gray-700 rounded-full cursor-pointer p-1"
              >
                Sign up with email
              </p>
            </div>

            {/* Right Section */}
            <div className="ml-16">
              <h2 className="text-lg font-medium">Login</h2>
              <hr className="w-72 mt-3 border-gray-600" />
              <label className="mt-4 block font-medium text-sm">
                Email
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="border border-gray-600 p-2 w-full rounded-md mt-2 bg-gray-700 text-white outline-none focus:border-blue-400"
                />
              </label>
              <label className="mt-4 block font-medium text-sm">
                Password
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  className="border border-gray-600 p-2 w-full rounded-md mt-2 bg-gray-700 text-white outline-none focus:border-blue-400"
                />
              </label>
              <div className="flex justify-between mt-4">
                <p
                  className="text-gray-400 text-sm hover:underline cursor-pointer"
                  onClick={forgotPassword}
                >
                  Forgot password?
                </p>
                <button
                  onClick={login}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <hr className="mt-6 border-gray-600" />
          <p className="text-sm text-center mt-3 text-gray-400">
            About . Careers . Privacy . Terms . Contact . Languages . Your Ad
            Choices . Press© GovAlert, Inc. 2024
          </p>
        </div>
        {emailSignup && <EmailSignup setEmailSignup={setEmailSignup} />}
      </div>
    </>
  );
};

export default Signup;
