const secureFileRegex = /\/(profile|quote|history)(\.html)?$/i;

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
}

export function secureStaticFiles(req, res, next) {
    if (req.url.match(secureFileRegex)?.length && !req.isAuthenticated())
        return res.status(403).redirect('/login');
    return next()
}