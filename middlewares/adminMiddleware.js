exports.onlyAdminAccess = async (req, res, next) => {
    try {
        console.log(req.user)
        if(req.user.role !== 1) { // not equal admin
            return res.status(403).json({
                success: false,
                msg: "You don't have permission to access this Route",
            });
        }
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            msg: "Access permission not available."
        });
    }
}

