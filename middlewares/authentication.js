const { verifyToken } = require('../services/token.service')


exports.verifyAuthToken = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(403).json({
            success: false,
            msg: 'Authorization token is missing.'
        });
    }

    const [tokenType, token] = authToken.split(" ");

    const decodedToken = await verifyToken(token);
    // console.log(decodedToken);
    if (decodedToken && !decodedToken.user) {
      return res.status(403).json({
        status: false,
        msg: "Bad token missing details.",
      });
    }
    req.user = decodedToken.user;
    
    next();

  } catch (error) {
    return res.status(400).json({
        sucess: false,
        msg: 'Invalid authorization!!!'
    })
  }
};


