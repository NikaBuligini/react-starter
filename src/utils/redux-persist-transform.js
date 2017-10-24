import { createTransform } from 'redux-persist';

/**
 * specialSerialize
 * @param state
 * @param key
 */
function serialize(state) {
  return state;
}

/**
 * specialDeserialize
 * @param state
 * @param key
 */
function deserialize(state) {
  return state;
}

const transform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  (state, key) => serialize(state, key),
  // transform state coming from storage, on its way to be rehydrated into redux
  (state, key) => deserialize(state, key),
  // configuration options
  { whitelist: ['session'] },
);

export default transform;
