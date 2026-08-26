import { useState } from "react";
import { ArrowLeft, Camera, Mail, MapPin, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const ProfilePage = () => {
  const navigate = useNavigate();
    const {authUser} = useAuthUser();
  const [user, setUser] = useState({
    fullName: authUser.fullName,
    // username: "alexmorgan",
    email: authUser.email,
    bio: authUser.bio,
    location: authUser.location,
    pfp: authUser.pfp,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    
    
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-">
      <h1 className="text-5xl">TODO</h1>
      <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-base-300">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-xl font-semibold">Profile</h1>
        </div>

        {/* Profile */}
        <div className="p-6">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center overflow-hidden">
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

            <h2 className="text-2xl font-bold mt-4">
              {user.fullName}
            </h2>

            {/* <p className="text-base-content/60">
              @{user.username}
            </p> */}

            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="text-sm text-success">Online</span>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 space-y-5">

            {/* Full Name */}
            <div>
              <label className="text-sm text-base-content/60">
                Full Name
              </label>

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
              <label className="text-sm text-base-content/60">
                Email
              </label>

              <div className="flex items-center gap-3 mt-2">
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm text-base-content/60">
                Location
              </label>

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

            {/* TODO:DOB */}
            <div>
              <label className="text-sm text-base-content/60">
                Location
              </label>

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

             {/* TODO:Profile created */}
            <div>
              <label className="text-sm text-base-content/60">
                Location
              </label>

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

            {/* Bio */}
            <div>
              <label className="text-sm text-base-content/60">
                Bio
              </label>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  rows="3"
                  className="textarea textarea-bordered w-full mt-1"
                />
              ) : (
                <p className="mt-2 text-base-content/80">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-primary flex-1"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost flex-1"
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
          </div>

          {/* TODO:Logout */}
          <button className="btn btn-error btn-outline w-full mt-4 gap-2">
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;