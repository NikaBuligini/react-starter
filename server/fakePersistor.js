function noop() {}

const fakePersistor = {
  subscribe: () => noop,
};

export default fakePersistor;
