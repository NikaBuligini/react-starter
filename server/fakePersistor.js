function noop() {}

const fakePersistor = {
  subscribe: () => noop,
  getState: () => ({ bootstrapped: true }),
};

export default fakePersistor;
