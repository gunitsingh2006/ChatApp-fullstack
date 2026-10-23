import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Camera,
  Mail,
  MapPin,
  User,
  LogOut,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { editProfile } from "../lib/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const queryClient = useQueryClient();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState({
    fullName: authUser.fullName,
    // username: "alexmorgan",
    email: authUser.email,
    bio: authUser.bio,
    location: authUser.location,
    pfp: authUser.pfp,
    dob: authUser.dob,
  });

  const [isEditing, setIsEditing] = useState(false);

  const editProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    editProfileMutation.mutate({
      fullName: user.fullName,
      bio: user.bio,
      location: user.location,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {/* TODO: */}

      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-2 py-1 border-b border-base-300">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-xl font-semibold">Your Profile</h1>
        </div>

        {/* Profile */}
        <div className="p-6 ">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="size-26 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                {user.pfp ? (
                  <img
                    src={user.pfp}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-primary-content font-bold">
                    {user.fullName.charAt(0)}
                  </span>
                )}
              </div>

              {isEditing && (
                <button className="absolute bottom-1 right-1 btn btn-primary btn-circle btn-sm">
                  <Camera size={16} />
                </button>
              )}
            </div>

            <h2 className="text-2xl font-bold mt-4">{user.fullName}</h2>

            {/* <p className="text-base-content/60">
              @{user.username}
            </p> */}

            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="text-sm text-success ">Online</span>
            </div>
          </div>

          {/* Info */}
          <div className=" bg-base-200 rounded-3xl p-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mb-2">
            {/* Full Name */}
            <div>
              <label className="text-sm text-base-content/60">Full Name</label>

              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1"
                />
              ) : (
                <div className="flex items-center gap-3 mt-2">
                  <User size={18} />
                  <span>{user.fullName}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-base-content/60">Email</label>

              <div className="flex items-center gap-3 mt-2">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm text-base-content/60">Location</label>

              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1"
                />
              ) : (
                <div className="flex items-center gap-3 mt-2">
                  <MapPin size={18} />
                  <span>{user.location}</span>
                </div>
              )}
            </div>

            {/* DOB (not editable after onboarding) */}
            <div>
              <label className="text-sm text-base-content/60">Date of Birth</label>
              <div className="flex items-center gap-3 mt-2">
                <Calendar size={18} />
                <span>{user.dob ? new Date(user.dob).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Not set"}</span>
              </div>
              <p className="text-xs text-base-content/50 mt-1">Date of birth cannot be changed after onboarding</p>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm text-base-content/60">Bio</label>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  rows="3"
                  className="textarea textarea-bordered w-full mt-1"
                />
              ) : (
                <p className="mt-2 text-base-content/80">{user.bio}</p>
              )}
            </div>
          </div>

          <div className="opacity-90 flex items-center justify-center">
            <p className="text-sm text-gray-300">
              🚀 Member since{" "}
              {new Date(authUser?.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>{" "}
          </div>

          {/* Buttons */}
          {/* to={"/edit-profile"}  */}
          <Link className="mt-4 flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-primary flex-1"
                  disabled={editProfileMutation.isPending}
                >
                  {editProfileMutation.isPending ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost flex-1"
                  disabled={editProfileMutation.isPending}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary w-full"
              >
                Edit Profile
              </button>
            )}
          </Link>

          {showLogoutModal && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Logout</h3>

                <p className="py-4">Are you sure you want to logout?</p>

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
            </div>
          )}

          <Link>
            <button
              className="btn btn-error btn-outline w-full mt-4 gap-2"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
