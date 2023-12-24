import React from "react";
import { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./signup.module.css";
import { register } from "../../../redux/authSlice";
import {
  // Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
const SignUp = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

 const [base64Image, setBase64Image] = useState("");
 const [file, setFile] = useState(null);
 const handleFileChange = (event) => {
   const selectedFile = event.target.files[0];

   if (selectedFile) {
     const reader = new FileReader();

     reader.onload = (e) => {
       // The result attribute contains the data URL as a base64 encoded string
       const base64String = e.target.result;
       setBase64Image(base64String);
     };

     reader.readAsDataURL(selectedFile);
     setFile(selectedFile);
     console.log("Base64Image>>>>>", base64Image);
   }
 };
 const handleRegister = async (e) => {
   e.preventDefault();

   try {
     console.log("user1");
     // let filename = null;
     // if (photo) {
     //   const formData = new FormData();
     //   filename = crypto.randomUUID() + photo.name;
     //   formData.append("filename", filename);
     //   formData.append("image", photo);

     // } else {
     //   return;
     // }

     const options = {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
     };
     console.log("user2");
     console.log("States>>>", state);
     //  const data = await request(
     //    "/auth/register",
     //    "POST",
     //    options,
     //    {
     //      ...state,
     //      img: base64Image,
     //    }
     //  );

     //  console.log("data", data);

     const res = await fetch(`http://24.144.91.45:5000/auth/register`, {
       headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify({ ...state, profileImg: base64Image }),
     });
     const data = await res.json();
     dispatch(register(data));
     navigate("/moviehome");
   } catch (error) {
     console.error(error);
   }
 };

  return (
    <div className={classes.container}>
        {/* <div className="w-72 text-center flex justify-center items-center  mx-[43%]  mt-10">
          <h1 className="text-2xl font-serif	font-light text-white">
            Enter details and enjoy services of
          </h1>
        </div> */}

        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Star_Movies_2023.svg/2560px-Star_Movies_2023.svg.png"
          alt="horse"
        />
      <div className={classes.wrapper}>
       
        <Typography
          variant="h4"
          className="body text-3xl !important text-center mb-5"
        >
          Sign Up
        </Typography>
        <Typography
          color="gray"
          className="body text-md !important text-center mb-10"
        >
          Enter your details to SignUp.
        </Typography>
        <form onSubmit={handleRegister}>
          <Input
            size="lg"
            type="text"
            name="username"
            placeholder="Username..."
            onChange={handleState}
          />
          <Input
            size="lg"
            type="text"
            name="email"
            placeholder="Email..."
            onChange={handleState}
          />

          <Input
            size="lg"
            type="password"
            name="password"
            placeholder="Password..."
            onChange={handleState}
            border="3"
          />
          <label className="ml-[-160px]" htmlFor="photo">
            Upload photo <AiOutlineFileImage />
          </label>
          <input
            size="lg"
            type="file"
            id="photo"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
            // onChange={(e) => setPhoto(e.target.files[0])}
          />
          <Checkbox
            containerProps={{ className: classes.customCheckbox }}
            inputProps={{ className: "hidden" }}
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
          />
          <Button
            className="bg-white-500 w-72 mt-[-20px] text-sm text-black border-black"
            fullWidth
            type="submit"
          >
            Register
          </Button>
          <p className="text-blue-950 flex-row ">
            Already have an account?{" "}
            <Link className="text-[#0369a1] ml-3 mt-[-1px]" to="/login">
              Login
            </Link>
          </p>
          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-80 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
