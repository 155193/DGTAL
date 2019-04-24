var User       		= require('../app/models/user');

exports.roleAuthorization = function(roles){

    return function(req, res, next){
        if (req.isAuthenticated()){
            var user = req.user;

            User.findById(user._id, function(err, foundUser){
                if(err){
                    res.status(422).json({error: 'No user found.'});
                    return next(err);
                }
                if(foundUser.local.role == 'admin'){
                  return next();
                }
                else {
                  if(roles.indexOf(foundUser.local.role) > -1){
                      return next();
                  }  
                }
    
                res.status(404).json({error: 'You are not authorized to view this content'});
                //return next('Unauthorized');
    
            });
        }else{
            res.redirect('/login');
        }
    }

}
