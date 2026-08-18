import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, Earth, HomeIcon, UsersIcon } from "lucide-react";

const SideBar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <aside className="w-64 h-screen flex-shrink-0 bg-base-200 border-r border-base-300 hidden lg:flex flex-col sticky top-0">
      <div className="p-5 border-base-300 border-b flex justify-center ">
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Earth className="w-10 h-10 text-primary" />
          <span className="text-3xl font-extrabold font-mono bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary tracking-wider">
            G-ChatApp
          </span>
        </Link>
      </div>


      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/home"
          className={`btn btn-circle justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/home" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-circle justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-circle justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>
      </nav>


      {/* USER PROFILE SECTION/STATUS */}
      <nav>
      <div className="p-4 border-t border-base-300 mt-auto">
        <Link
        // TODO:
        to="/userprofile"
        className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.pfp} alt="User Avatar" />
            </div>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="font-bold text-xs text-success flex items-center gap-1"> 
              <span className=" bg-success size-2 rounded-full inline-block"/>
                Online
            </p>
            
          </div>
        </Link>
      </div>
         </nav> 
    </aside>
  );
};

export default SideBar;
