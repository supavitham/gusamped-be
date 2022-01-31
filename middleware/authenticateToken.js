
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy //ใช้ในการประกาศ Strategy
const ExtractJWT = passportJWT.ExtractJwt //ใช้ในการ decode jwt ออกมา
const { verifyAccessToken,verifyRefreshToken } = require('../utils/token_utils');

//เสียบ Strategy เข้า Passport
passport.use(
    'jwt_access_token',
    new JWTStrategy( //สร้าง Strategy
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        },
        (payload, cb) => {
            cb(null, payload)
        }
    )
);

passport.use(
    'jwt_refresh_token',
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        },
        (payload, cd) => {
            cd(null, payload)
        }
    )
)

module.exports = {
    authenticateAccessToken: async (req, res, next) => {
        //ทำ Passport Middleware
        passport.authenticate('jwt_access_token', async (_, user) => {
            if (!user) return res.status(401).send("Passport Unauthorized");

            try {
                let token = req.headers['authorization'].split(' ')[1]
                let valid_access_token = await verifyAccessToken(token);

                if (!valid_access_token) return res.status(401).send("Verify Token Unauthorized");
                req.user = user
                next()


            } catch (error) {
                const err = Error(error)
                err.status = 400
                next(err)
            }
        })(req, res, next)
    }, 
    authenticateRefreshToken: async (req, res, next) => {
        passport.authenticate('jwt_refresh_token', async (_, user) => {

            if (!user) return res.status(401).send("Unauthorized");

            try {
                let token = req.headers['authorization'].split(' ')[1]

                let valid_access_token = await verifyRefreshToken(token)

                if (!valid_access_token) return res.status(401).send("Unauthorized");

                req.user = user

                delete req.user.iat
                delete req.user.exp

                //delete req.user.aud
                next()

            } catch (error) {
                const err = Error(error)
                err.status = 400
                next(err)
            }

        })(req, res, next)
    }
}