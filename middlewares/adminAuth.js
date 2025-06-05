
// Function to check if the user is admin or not.
export default function (req, res, next) {
  const isAdmin = req.headers['x-admin'] === 'true';
  if (!isAdmin) return res.status(403).json({ error: 'Admin access only' });
  next();
}
