
const passport = require('passport');
const mongoose= require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var cors = require('cors')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({    
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy:true,
    },
    (accessToken, refreshToken, profile, done) =>{
		console.log("ewwrw")
		//done(null,null)
    User.findOne({googleId:profile.id})
    .then((existingUser)=>{
        if(existingUser){
            done(null,existingUser)
        }
        else{
			console.log("Here")
            new User({
                googleId:profile.id,
                userName:profile.displayName,
                picture:profile._json.picture,
                displayName:'',
                dateOfJoining:Date.now(),
                googleMail:profile.emails[0].value,
                genderType:''
            }).save()
            .then((user)=>{
                done(null,user)
            })
        }
    })
    }
    )
);