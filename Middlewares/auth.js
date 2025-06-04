
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const user = jwt.verify(token, process.env.SECRET_JWT);
    req.user = user; // שמירה ב־req לשימוש בהמשך
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
