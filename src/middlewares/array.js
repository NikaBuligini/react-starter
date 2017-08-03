/* eslint-disable no-unused-expressions */

export default () => next => (action) => {
  Array.isArray(action) ? action.map(next) : next(action);
};
