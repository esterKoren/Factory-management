const userWsRepository = require('Repositories/userWsRepository');
const jwt = require('jsonwebtoken');

/**
 * Authenticates a user by username and email, and returns a JWT token if found.
 * @param {string} username
 * @param {string} email
 * @returns {Promise<{token: string, user: object}|null>}
 */
const loginUser = async (username, email) => {
  const response = await userWsRepository.getUserByEmailAndUsername(username, email);
  const users = response?.data;

  if (Array.isArray(users) && users.length > 0) {
    const user = users[0];

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_JWT || 'default_secret',
      { expiresIn: '1h' }
    );

    return { token, user };
  }

  return null;
};

module.exports = { loginUser };
// This service handles user authentication by checking the provided username and email against an external API.
// If a user is found, it generates a JWT token containing the user's details and returns it along with the user object.