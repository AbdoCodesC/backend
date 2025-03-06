import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schema/user.js";

passport.serializeUser((user, done) => {
  console.log(`inside serialize user\n${user}`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`inside de-serialize user ${id}`);
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    // {usernameField: 'email', passwordField: 'password'},
    console.log(`username ${username} password ${password}`);
    try {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");
      console.log(user);
      if (user.password !== password) throw new Error("Invalid Credentials");
      done(null, user);
    } catch (err) {
      console.log(`error ${err.message}`);
      done(err, null);
    }
  })
);
