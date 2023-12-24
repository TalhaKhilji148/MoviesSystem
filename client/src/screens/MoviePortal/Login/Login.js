import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../redux/authSlice";
import { request } from "../../../util/fetchAPI";
import classes from "./signin.module.css";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const options = {
        "Content-Type": "application/json",
      };

      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });
      navigate("/moviehome");

      dispatch(login(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div>
        
        
        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Star_Movies_2023.svg/2560px-Star_Movies_2023.svg.png"
          alt="horse"
        />
      </div>
      <div className={classes.wrapper}>
        <Typography
          variant="h4"
          className="body text-3xl !important text-center mb-5"
        >
          Sign In
        </Typography>
        <Typography
          color="gray"
          className="body text-md !important text-center mb-10"
        >
          Enter your details to Login.
        </Typography>
        {/* <h2 className="body text-xl !important">Sign in</h2> */}
        <form onSubmit={handleLogin}>
          <div className="mb-[-20px] w-96 flex flex-col gap-6">
            <Input
              size="lg"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-bold transition-colors hover:text-red-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "ml-[-130px]" }}
          />
          <Button
            className="bg-white-500 w-72 mt-[-20px] text-sm text-black border-black"
            fullWidth
            type="submit"
          >
            Sign in
          </Button>
          <p className="text-blue-950 flex-row mt-[-21px]">
            Already have an account?{" "}
            <Link className="text-[#0369a1] ml-3 mt-[-1px]" to="/signup">
              Register
            </Link>
          </p>
          <button
            type="button"
            class=" mb-20 py-2  px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-80 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
