exports.formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.perPage = 10;

exports.saltRounds = 10;

exports.brandsSchemaName = 'brands';

exports.usersSchemaName = 'users';

exports.productsSchemaName = 'products';

exports.ordersSchemaName = 'orders';

exports.modsSchemaName = 'moderators';

exports.emailFail = 'Email đã được sử dụng.';

exports.imageTempPath = 'public/images/tmp';

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

exports.isUnLoggedIn = (req, res, next) => {
    if (req.isUnauthenticated())
        return next();
    res.redirect('/');
};

exports.secretSession = 'S6K445z(z#x1z/19gap,K';