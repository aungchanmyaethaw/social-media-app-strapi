import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
const Login = () => {
  const { handleJwt, handleAuthedUser } = useAppContext();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const navigate = useNavigate();
  // handle input value
  const handleChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  // handle Login

  const handleLogin = async (e) => {
    e.preventDefault(e);
    setIsDisabledBtn(true);
    try {
      const res = await axios.post("http://127.0.0.1:1337/api/auth/local", {
        identifier: userData.email,
        password: userData.password,
      });
      handleJwt(res.data.jwt);
      handleAuthedUser(res.data.user);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
    setIsDisabledBtn(false);
  };

  return (
    <section className="container min-h-screen  mx-auto px-8 py-8">
      {/* Header */}

      <div className="flex justify-between items-center max-w-[1024px] mx-auto mb-8">
        <img className="w-20 h-20 rounded-lg" src="../src/images/2.png" alt="logo" />
        <h1 className="text-3xl text-white font-head">Login</h1>
      </div>

      {/* line */}

      <div className="w-full h-[1px] bg-white " />

      {/* form  */}
      <form
        className="mt-12 max-w-[768px] mx-auto mb-12"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col mb-8">
          <label htmlFor="email" className="text-white mb-4 font-body text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-[#444] py-2 px-2 text-light rounded-md caret-white text-white border-2 border-transparent focus:outline-none  focus:border-white"
            required
            autoFocus
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-16">
          <label
            htmlFor="password"
            className="text-white mb-4 font-body text-lg"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-[#444] py-2 px-2 text-light rounded-md caret-white text-white border-2 border-transparent focus:outline-none  focus:border-white"
            required
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <span className="font-body mt-2 text-white">
            At least 8 characters.
          </span>
        </div>

        <div className="flex justify-center mb-24">
          <button
            className="text-white w-[15rem] bg-primary py-2 font-semibold text-lg rounded-3xl transition-colors duration-200 hover:bg-orange-700 font-head"
            type="submit"
            disabled={isDisabledBtn}
          >
            Log in
          </button>
        </div>
      </form>

      <div className="text-primary flex gap-2 items-baseline justify-end font-body text-lg">
        <p>Don't have an account? </p>
        <Link className="underline" to="/signup">
          Sign up here
        </Link>
      </div>
    </section>
  );
};

export default Login;
