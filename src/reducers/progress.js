// @flow

function statuses(state: Object = {}, status: ?Object, progressId: string) {
  return Object.assign({}, state, {
    [progressId]: status ? 'loaded' : 'loading',
  });
}

let activeProgresses = 0;

export function resetProgressCounter() {
  activeProgresses = 0;
}

const initialState = {
  isActive: false,
  fetchStatus: {},
};

export default function progress(state: typeof initialState = initialState, action: Object) {
  if (action.progressId) {
    const status = state.fetchStatus[action.progressId];

    activeProgresses += status ? -1 : 1;

    return {
      isActive: activeProgresses !== 0,
      fetchStatus: statuses(state.fetchStatus, status, action.progressId),
    };
  }

  return state;
}
