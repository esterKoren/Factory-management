

const axios = require('axios');

const urlUser = 'https://jsonplaceholder.typicode.com/users';

/**
 * מחפש משתמש לפי שם משתמש ואימייל
 * @param {string} username
 * @param {string} email
 * @returns {Promise<AxiosResponse>}
 */
const getUserByEmailandUsername = (username, email) => {
  return axios.get(urlUser, {
    params: {
      username,
      email
    }
  });
};

module.exports = { getUserByEmailandUsername };

