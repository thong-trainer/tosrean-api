const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models/user');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'telephone',
		passwordField: 'password',
		passReqToCallback: true
	},
	
	function(req, telephone, password, done){
		process.nextTick(function(){
      console.log('creating... '+telephone+" ? "+password);
			console.log('-------------');
			console.log(req.body);


			User.findOne({'telephone': telephone}, function(err, user){

				if(err){
          console.log("Error function ...")
          return done(err);
        }
				if(user){
					return done(null, false, req.flash('signupMessage', 'That telephone already exists'));
				} else {
					var newUser = User(req.body);
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			});

		});
	}));




  	passport.use('local-login', new LocalStrategy({
  			usernameField: 'email',
  			passwordField: 'password',
  			passReqToCallback: true
  		},
  		function(req, email, password, done){
  			process.nextTick(function(){
  				User.findOne({ 'email': email}, function(err, user){
            console.log(user);
  					if(err)
  						return done(err);
  					if(!user)
  						return done(null, false, req.flash('loginMessage', 'No User found'));
  					if(!user.validPassword(password)){
  						return done(null, false, req.flash('loginMessage', 'invalid password'));
  					}
  					return done(null, user);

  				});
  			});
  		}
  	));

    passport.use(new BearerStrategy({},
  		function(token, done){
  			User.findOne({ active: true }, function(err, user){
  				if(!user)
  					return done(null, false);
  				return done(null, user);
  			});
  		}));

}
