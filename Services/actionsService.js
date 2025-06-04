
const actionsRepositore = require('Repositories/actionsRepository');
const usersServic=require('Services/usersServic')
const dateUtils = require('utils/dateUtils.js');

/**
 * Updates the user's action count for today.
 * - If the user has already performed actions today, it reduces the remaining allowed actions by 1.
 * - If this is the first action today, it creates a new action object with maxActions - 1.
 * - Throws an error if no actions are left for today.
 *
 * @param {string} userId - The ID of the user performing the action.
 * @throws Will throw an error if the user has no actions left today.
 */
const updateUserActions = async (userId) => {
  const today = dateUtils.getTodayDate(); // תאריך בפורמט מתאים
  const actions = await actionsRepositore.getActions();

  const userActionsToday = actions?.filter(a => a.id === userId && a.date === today);
  const minActionObj = userActionsToday?.reduce((min, current) => {
    return current.actionAllowd < min.actionAllowd ? current : min;
  });

  console.log(minActionObj);

  if (minActionObj) {
    if (minActionObj.actionAllowd <= 0) throw new Error('No actions left');
    minActionObj.actionAllowd -= 1;
  } else {
    const userMax = usersServic.getMaxActions(userId); 
    actions.push({ id: userId, maxActions: userMax, date: today, actionAllowd: userMax - 1 });
  }

  await saveActionsFile(actions);
};
module.exports = {
  updateUserActions,
};

