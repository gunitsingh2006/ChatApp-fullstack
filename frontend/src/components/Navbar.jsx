import { useState } from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";
 

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
  // const { mutate:logoutMutataion, isPending, error} = useMutation({
  //   mutationFn: logout,
  //   onSuccess:()=> queryClient.invalidateQueries({queryKey:["authUser"]})
  // })
  const { logoutMutation } = useLogout();
const [showLogoutModal, setShowLogoutModal] = useState(false);
 

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-14 flex-shrink-0 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 items-center justify-center w-full">
          {/* LOGO ONLY IF WE ARE ON CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/home" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  G-ChatApp
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar" >
            <Link to={"/userprofile"} >
              <img src={authUser?.pfp} alt="User Avatar" className="w-9 rounded-full" rel="noreferrer" />
            </Link>
          </div>


{showLogoutModal && (
  <div className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Confirm Logout</h3>

      <p className="py-4">
        Are you sure you want to logout?
      </p>

      <div className="modal-action">
        <button
          className="btn"
          onClick={() => setShowLogoutModal(false)}
        >
          Cancel
        </button>

        <button
          className="btn btn-error"
          onClick={() => {
            setShowLogoutModal(false);
            logoutMutation();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  </div>)}

          

          {/* Logout button */}
          <button
  className="btn btn-ghost flex items-center justify-center gap-1"
  onClick={()=>setShowLogoutModal(true)}
>
  <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
  <p>Logout</p>
</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
