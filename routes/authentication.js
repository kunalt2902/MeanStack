const User = require('../models/user');

module.exports = (router) => {
	router.post('/register',(req,res,next) => {
		if(!req.body.email){
			res.json({success: 'fail', message: 'User must provide an email'});
		}else{
			if(!req.body.username){
				res.json({success: 'fail', message: 'User must provide an username'});
			}else{
				if(!req.body.password){
					res.json({success: 'fail', message: 'User must provide a password'});
				}else{
					
					let user = new User({
						email: req.body.email,
						username: req.body.username,
						password: req.body.password
					});	
					user.save((err) => {
						if(err)
							console.log("Error connecting to the db: "+err);
						else
							res.json({success: true, message: 'User saved'});

					})
				}
					
			}
			
		}
		
	});
	return router;
}

