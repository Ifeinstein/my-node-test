const passport = require('koa-passport');
const model = require('./model');

let User = model.User;

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findOne({ where: { id: id } })
        done(null, user)
    } catch (err) {
        done(err)
    }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(async function(username, password, done) {
    let user = await User.findOne({ where: { email: username, password: password } })
    if (user) {
        done(null, user)
    } else {
        done(null, false)
    }
}))

// const FacebookStrategy = require('passport-facebook').Strategy
// passport.use(new FacebookStrategy({
//         clientID: 'your-client-id',
//         clientSecret: 'your-secret',
//         callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
//     },
//     function(token, tokenSecret, profile, done) {
//         // retrieve user
//         User.findOne({ facebook_id: profile.id }, done);
//     }
// ))

// const TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//         consumerKey: 'your-consumer-key',
//         consumerSecret: 'your-secret',
//         callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//     },
//     function(token, tokenSecret, profile, done) {
//         // retrieve user
//         User.findOne({ twitter_id: profile.id }, done);
//     }
// ))

// const GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//         clientId: 'your-client-id',
//         clientSecret: 'your-secret',
//         callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//     },
//     function(token, tokenSecret, profile, done) {
//         // retrieve user
//         User.findOne({ google_id: profile.id }, done);
//     }
// ))
