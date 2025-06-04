const actionsService = require('../Services/actionsService');

/**
 * Middleware to check and update user's allowed actions for today.
 * Throws an error if the user has no actions left for today.
 *
 * Usage: Place this middleware before protected routes that require action tracking.
 *
 * Expects req.user.id or req.body.userId to identify the user.
 */
const checkUserActions = async (req, res, next) => {
  try {
    // Adjust this line based on how you identify the user in your app
    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    await actionsService.updateUserActions(userId);
    next();
  } catch (err) {
    res.status(403).json({ error: err.message || 'No actions left for today' });
  }
};

module.exports = checkUserActions;
