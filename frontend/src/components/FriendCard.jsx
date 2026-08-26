import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitialize } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-300 hover:shadow-md transition-shadow rounded-2xl">
      <div className="card-body p-5">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 ">
            <img src={friend.pfp} className="rounded-full" alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{capitialize(friend.fullName)}</h3>
        </div>

        <div className="flex flex-wrap  gap-1.5 mb-3">
          <button className="badge badge-secondary badge-sm rounded-2xl">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </button>
          <span className="badge badge-outline badge-sm rounded-2xl">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>

         
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-circle hover:border-white w-full">
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