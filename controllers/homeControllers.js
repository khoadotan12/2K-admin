const path = require('path');

exports.home = (req, res, next) => {
    const data = {
        revenue: '1,062,231,000',
        users: 1717,
        products: 765,
        orders: 4166,
    };
    res.render('home/index', { title: 'Trang chủ', data });
};

exports.loginGet = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
};

exports.logout = (req, res) => {
    req.session.destroy();
    req.logout();
    res.clearCookie('connect.sid');
    res.redirect('/login');
}