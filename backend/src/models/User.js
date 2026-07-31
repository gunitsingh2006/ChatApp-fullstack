import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    pfp: {
      type: String,
      default: "",
    },
    nativLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: String,
      default: false,
    },
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
  },
  { timestamps: true },
);
// CreatedAt, UpdatedAt
// this will show when the user is a member since created
// make a pre hook , put before creating model


// HASHING - there should not be a visible password for users in db (hide pasword with #string)
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); // if pass not changed do not try to hash it
    // take pass 12345 => &$%#&^* (hashed)
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
});


// creating password matching
userSchema.methods.matchPassword = async function(enteredPassword){
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
}

// final create a model
const User = mongoose.model("User", userSchema);
export default User;