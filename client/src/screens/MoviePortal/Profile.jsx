import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <section className="bg-primary ml-44 text-black " >
      <div className="container mx-auto grid md:grid-cols-2 items-center md:justify-between">
        <div className="about-info mb-5">
          <h2 className="text-4xl font-bold mt-10 mb-5 border-b-[5px] w-[200px] border-indigo-600 pb-2">
            My Profile
          </h2>

          <p className="pb-5 text-sky-700">Here is the detail about you.</p>
        </div>

        <div></div>
      </div>

      <div className="projects container mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <img
            className="rounded-md w-[50%] h-[40%] mb-12"
            src={user.profileImg}
            alt={user.username}
          />

          <h3 className=" text-md">Name: {user.username}</h3>
          <h3 className="py-5 mt-[-20px] text-md">Email: {user.email}</h3>
          <h3 className="py-5 mt-[-20px] text-md mb-5">
            Description: Meet
            <span className="ml-1 text-sky-700">{user.username}</span>, an avid
            explorer of the digital realm and a passionate tech enthusiast. With
            a knack for problem-solving and a keen interest in emerging
            technologies, {user.username} navigates the vast landscape of the
            internet with curiosity and zeal. Username: DigitalNomad2
          </h3>
          <div className="flex space-x-8 mb-12">
            <a href={""} target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href={""} target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                alt="Google"
                className="w-8 h-8"
              />
            </a>
            <a href={""} target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
            <a href={""} target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="w-8 h-8"
              />
            </a>
          </div>
          <button
            href={user.profileImg}
            className=" btn bg-accent  border-1 rounded-md mb-20 border-[#050505] bg-sky-700 text-white px-12 py-1 hover:bg-sky-800"
          >
            Edit
          </button>
        </div>
        <div>
          {/* paste svg here */}
          <img
            className="w-[100%] h-[1000px] mt-[-200px] mr-[-20px]"
            src="https://img.freepik.com/premium-vector/modern-material-design-background-paper-sheets-with-shadows_444390-824.jpg?size=626&ext=jpg"
            alt="Profile Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
