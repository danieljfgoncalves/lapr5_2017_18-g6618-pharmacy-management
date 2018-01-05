/**
 * requireRoles.js
 * 
 * Middleware to check for roles.
 */

exports.requireRoles = function (requiredRoles) {
    return function (req, res, next) {

        var allowed = false;

        req.user["https://lapr5.isep.pt/roles"].forEach(adquiredRole => {
            if (requiredRoles.indexOf(adquiredRole) > -1) {
                next();
                allowed = true;
            }
        });

        if (!allowed) {
            return res.status(403).send({'Message':'Unauthorized User'});
        }
    }
}