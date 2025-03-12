export const authRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Akses ditolak" });
    }
    next();
  };
};
