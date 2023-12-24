"use client";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";

const HeaderMovie = () => {
  // Navbar toggle

  const [navbarOpen, setNavbarOpen] = useState(false);
   const [state, setState] = useState({});
   const [photo, setPhoto] = useState(null);
   const [isScrolled, setIsScrolled] = useState(false);
   const [showForm, setShowForm] = useState(false);
   const { user, token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const menuData = [
     {
       id: 1,
       title: "Home",
       path: "/moviehome",
       newTab: false,
     },
  
     {
       id: 4,
       title: "My Movies",
       path: `/mymovies/${user?._id}`,
       newTab: false,
     },
    
   ];
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };
  
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="mb-16">
      <>
        <header
          className={`h-16  header top-0 left-0 z-30 flex w-full items-center bg-[#120f0f] ${
            sticky
              ? "!fixed !z-[9999] !bg-black !bg-opacity-60 text-white  shadow-sticky backdrop-blur-sm !transition"
              : "absolute"
          }`}
        >
          <div className="container ml-28 bg-black-700">
            <div className="relative -mx-4 flex items-center justify-between">
              <div className="w-60 max-w-full px-4 xl:mr-12">
                <Link
                  to="/moviehome"
                  className={`header-logo block w-full ${
                    sticky ? "py-5 lg:py-2" : "py-8"
                  } `}
                >
                  <p className="font-bold text-xl text-red-600"> Movies</p>
                </Link>
              </div>
              <div className="flex w-full items-center justify-between px-4">
                <div>
                  <button
                    onClick={navbarToggleHandler}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300  ${
                        navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300  ${
                        navbarOpen ? "opacity-0 " : " "
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300  ${
                        navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                    />
                  </button>
                  <nav
                    id="navbarCollapse"
                    className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-black py-12 px-12 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                      navbarOpen
                        ? "visibility top-full opacity-100"
                        : "invisible top-[120%] opacity-0"
                    }`}
                  >
                    <ul className="block lg:flex lg:space-x-12">
                      {menuData.map((menuItem, index) => (
                        <li key={menuItem?.id} className="group relative">
                          {menuItem.path ? (
                            <Link
                              to={menuItem.path}
                              className={`flex py-2 text-base text-white hover:bg-[#c1be30] hover:py-1 hover:mt-5 hover:ml-[-30px] focus-visible:[#0369a1] hover:text-white hover:px-8 hover:rounded-md  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                            >
                              {menuItem?.title}
                            </Link>
                          ) : (
                            <>
                              <a
                                onClick={() => handleSubmenu(index)}
                                className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:[#0369a1]  lg:mr-0 lg:inline-flex lg:py-6 lg:px-0"
                              >
                                {menuItem.title}
                                <span className="pl-3">
                                  <svg
                                    width="15"
                                    height="14"
                                    viewBox="0 0 15 14"
                                  >
                                    <path
                                      d="M7.81602 9.97495C7.68477 9.97495 7.57539 9.9312 7.46602 9.8437L2.43477 4.89995C2.23789 4.70308 2.23789 4.39683 2.43477 4.19995C2.63164 4.00308 2.93789 4.00308 3.13477 4.19995L7.81602 8.77183L12.4973 4.1562C12.6941 3.95933 13.0004 3.95933 13.1973 4.1562C13.3941 4.35308 13.3941 4.65933 13.1973 4.8562L8.16601 9.79995C8.05664 9.90933 7.94727 9.97495 7.81602 9.97495Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              </a>
                              <div
                                className={`submenu relative top-full left-0 rounded-md bg-white transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                  openIndex === index ? "block" : "hidden"
                                }`}
                              >
                                
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  {user ? (
                    <Link to="/profile">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={user.profileImg}
                        alt="User Profile"
                      />
                    </Link>
                  ) : null}

                  {user ? (
                    <>
                      <Link className="hidden py-3 px-7 text-base font-bold text-white hover:opacity-70 md:block">
                        {user.username}
                      </Link>

                      <Link
                        onClick={handleLogout}
                        to="/login"
                        className="ease-in-up hidden rounded-md bg-red-700 py-2 px-4 text-base font-light text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-3 xl:px-4"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="ease-in-up hidden rounded-md bg-red-700 py-2 px-4 text-base font-light text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-3 xl:px-4"
                      >
                        Login
                      </Link>
                    </>
                  )}
                  <Link
                    to="/listmovie"
                    className="ease-in-up ml-5  mr-5 hidden rounded-md bg-[#c1be30] py-2 px-8 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    List your movie
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    </div>
  );
};

export default HeaderMovie;
