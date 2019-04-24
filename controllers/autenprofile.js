exports.profileautentification = (req, res) => {
    var role = req.user.local.role;
    if (role === 'admin') {
        res.redirect('/admin/profile');
    } else {
        res.redirect('/client/profile');
    }
}