const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index')

});


router.get('/signup', (req, res, next) => {
    res.render('signup');

});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))


//Logout -> para salir del registro

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})


// redirigir a un perfil despues de la autenticacion
router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
    };

module.exports = router;