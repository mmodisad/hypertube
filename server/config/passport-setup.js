import passport from 'passport'
import Oauth2Strategy from 'passport-oauth2'
import { keys } from './keys'
import { findOrCreate } from '../models/userModel'

let ftClient = new Oauth2Strategy ({
  authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
  tokenURL: 'https://api.intra.42.fr/oauth/token',
  clientID: keys.wtc.clientID,
  clientSecret: keys.wtc.clientSecret,
  callbackURL: '/api/users/auth/redirect',
  scope: 'profile'
  }, async (token, refreshToken, profile, callback) => {
    callback(null, await findOrCreate(profile))
})

let gitClient = new Oauth2Strategy({
  authorizationURL: 'https://github.com/login/oauth/authorize',
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: keys.git.clientID,
  clientSecret: keys.git.clientSecret,
  callbackURL: '/api/users/auth/redirect2'
}, async (token, refreshToken, profile, callback) => {
    profile.first_name = profile.name
    profile.last_name = ''
    if (profile.email == null)
      callback({'error': 'email not found'}, null)
    callback(null, await findOrCreate(profile))
  }
)


ftClient.userProfile = function (accesstoken, done) {
    // choose your own adventure, or use the Strategy's oauth client
    this._oauth2._request("GET", "https://api.intra.42.fr/v2/me", null, null, accesstoken, (err, data) => {
      if (err) { return done(err); }
      try {
          data = JSON.parse( data );
      }
      catch(e) {
        return done(e);
      }
      done(null, data);
    })
}



gitClient.userProfile = function (accesstoken, done) {
  this._oauth2._request("GET", "https://api.github.com/user", null, null, accesstoken, (err, data) => {
    if (err) { return done(err); }
    try {
        data = JSON.parse( data );
    }
    catch(e) {
      return done(e);
    }
    done(null, data);
  })
}



passport.use('42', ftClient)
passport.use('github', gitClient)

export default passport