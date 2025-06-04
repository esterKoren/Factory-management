const jf = require('jsonfile');

const FILE = 'Data/actions.json';

const getActions = () => {
  return jf.readFile(FILE);
};

const setActions = (actions) => {
  return jf.writeFile(FILE, actions);
};

module.exports = {
  getActions,
  setActions,
};