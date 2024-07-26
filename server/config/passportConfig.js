import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import 'dotenv/config';
import { UserModel } from '../models/userModel.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTK_SECRET_KEY,
};
const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

export default passportStrategy;
