/* eslint-disable no-unused-vars */

function track(action) {
  // console.log(action);
}

export default () => next => (action) => {
  track(action);
  return next(action);
};
