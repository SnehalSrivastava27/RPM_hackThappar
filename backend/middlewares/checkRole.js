const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).send({ error: 'Not authorized' });
      }
      next();
    };
  };
  
  module.exports = checkRole;