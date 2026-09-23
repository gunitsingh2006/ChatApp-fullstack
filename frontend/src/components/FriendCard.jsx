import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitialize } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-300 rounded-2xl h-full hover:shadow-md transition-shadow">
      <div className="card-body p-5 flex flex-col">

        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={friend.pfp}
                alt={friend.fullName}
              />
            </div>
          </div>

          <h3 className="font-semibold truncate">
            {capitialize(friend.fullName)}
          </h3>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="badge badge-secondary badge-sm rounded-full gap-1">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>

          <span className="badge badge-outline badge-sm rounded-full gap-1">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* CHAT BUTTON */}
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-sm w-full bg-primary text-primary-content rounded-full mt-auto"
        >
          Chat
        </Link>

      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }

  return null;
}