const jwt = require("jsonwebtoken");
const { getIPAddressFromRequest } = require("./network_utils");
const dotenv = require("dotenv");
const { reject } = require("bcrypt/promises");
dotenv.config();

const signAccessToken = (req) => new Promise((resolve, reject) => {
    let payload = { email: req.body.email }
    let secret = process.env.ACCESS_TOKEN_SECRET
    let jwtOption = {
        //audience: req.user.id.toString(),
        expiresIn: '1m',
        // algorithm: "RS256",
    }
    // jwt.sign(payload,secret,jwtOption,async (error,encode) => {
    //     console.log("encode.... ",encode);
    //     if (error) {
    //         return reject(error)
    //     }
    //     return resolve(encode);
    // })
    try {
        const token = jwt.sign(payload, secret, jwtOption);

        return resolve(token)
    } catch (error) {
        return reject(err)
    }

})

const signRefreshToken = (req) => new Promise((resolve, reject) => {

    let payload = { user: req.body.email }
    let secret = process.env.REFRESH_TOKEN_SECRET
    let jwtOption = {
        expiresIn: '2d',
    }

    try {
        const token = jwt.sign(payload, secret, jwtOption);
        const ip = getIPAddressFromRequest(req)

        return resolve({ refreshToken: token, ip: ip })
    } catch (error) {
        return reject(err)
    }

})

module.exports = {
    generateToken: async (req, res, next) => {
        try {
            const accessToken = await signAccessToken(req)
            const { refreshToken, ip } = await signRefreshToken(req)

            return res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                tokenType: "bearer",
            })
        } catch (error) {
            const err = Error(error)
            err.status = 400
            next(err)
        }
    },
    verifyAccessToken: (token) => new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(err)
            })
            return resolve(true);
        } catch (error) {
            return resolve(false);
        }

    }),
    verifyRefreshToken: (token) => new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(err)
            })
            return resolve(true);
        } catch (error) {
            return resolve(false);
        }

    })
}