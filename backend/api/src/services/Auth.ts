import _ from "lodash";
import passport from "passport";
import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";

interface Options {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}

export class AuthService extends BaseService {
  passport: passport.PassportStatic;
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
    super(services);

    this.passport = passport;
  }

  preparePassport() {
    this.passport.use(this.config.auth.JWT, this.prepareStategy());
  }

  prepareStategy() {
    const opts: Options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.config.SECRETJWT,
    };
    return new Strategy(opts, (jwtPayload, done) => {
      this.context.database.models.User.findByPk(jwtPayload.id)
        .then((user) => {
          if (user) {
            // const permissions = flatterUserPermissions(user.toJSON() as User);
            return done(null, {
              ...user.toJSON(),
              // permissions,
              user_roles: undefined,
              password: undefined,
            });
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          done(null, false);
        });
    });
  }

  preparePublicStrategy() {
    const opts: Options = {
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
      secretOrKey: this.config.SECRETJWT,
    };
    return new Strategy(opts, (jwtPayload, done) => {
      this.context.database.models.User.findByPk(jwtPayload.id, {})
        .then((user) => {
          if (user) {
            return done(null, {
              ...user.toJSON(),
              user_roles: undefined,
              password: undefined,
            });
          }
          return done(null, false);
        })
        .catch((_err) => {
          done(null, false);
        });
    });
  }

  async asyncInit() {
    this.preparePassport();
  }
}
